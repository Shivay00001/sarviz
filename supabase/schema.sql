-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS TABLE (Extends Supabase Auth)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'business_owner' CHECK (role IN ('business_owner', 'agency', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- BUSINESSES TABLE (Profile)
CREATE TABLE public.businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  industry TEXT,
  city TEXT,
  service_area TEXT,
  monthly_budget DECIMAL(10, 2),
  goal TEXT, -- 'calls', 'visits', 'leads'
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ONBOARDING RESPONSES (Detailed data)
CREATE TABLE public.onboarding_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  current_problems TEXT[],
  competitors TEXT[],
  target_audience TEXT,
  unique_selling_point TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- GROWTH PLANS (AI Generated)
CREATE TABLE public.growth_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  platforms_recommended TEXT[],
  daily_budget_suggestion DECIMAL(10, 2),
  marketing_funnel JSONB, -- Structured steps
  offer_ideas TEXT[],
  ad_copy_suggestions JSONB, -- { "platform": "copy" }
  seo_checklist JSONB, -- [ { "task": "...", "checked": false } ]
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CAMPAIGNS (MVP)
CREATE TABLE public.campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  platform TEXT NOT NULL, -- 'google', 'meta', 'instagram'
  status TEXT DEFAULT 'planned' CHECK (status IN ('planned', 'running', 'paused', 'completed')),
  budget DECIMAL(10, 2),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- LEADS CRM
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  source TEXT, -- 'google', 'facebook', 'walk-in', 'referral'
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'lost')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ANALYTICS (Daily Snapshots)
CREATE TABLE public.analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  leads_count INT DEFAULT 0,
  spend DECIMAL(10, 2) DEFAULT 0,
  impressions INT DEFAULT 0,
  clicks INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS POLICIES
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onboarding_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.growth_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- Policy: Users can see their own data
CREATE POLICY "Users can view own profile" ON public.users 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users 
  FOR UPDATE USING (auth.uid() = id);

-- Policy: Businesses access (Owner only)
-- Helper function to check business ownership could be added, but simple join is basic MVP approach
-- For MVP, we assume business.user_id = auth.uid()

CREATE POLICY "Owners can view own business" ON public.businesses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Owners can update own business" ON public.businesses
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Owners can create business" ON public.businesses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Apply similar policies for related tables using join or simply checking business ownership if we pass business_id
-- Ideally, we check if the user owns the business linked to the record.

CREATE POLICY "Access own onboarding" ON public.onboarding_responses
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.businesses WHERE businesses.id = onboarding_responses.business_id AND businesses.user_id = auth.uid())
  );

CREATE POLICY "Access own growth plans" ON public.growth_plans
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.businesses WHERE businesses.id = growth_plans.business_id AND businesses.user_id = auth.uid())
  );

CREATE POLICY "Access own campaigns" ON public.campaigns
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.businesses WHERE businesses.id = campaigns.business_id AND businesses.user_id = auth.uid())
  );

CREATE POLICY "Access own leads" ON public.leads
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.businesses WHERE businesses.id = leads.business_id AND businesses.user_id = auth.uid())
  );

CREATE POLICY "Access own analytics" ON public.analytics
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.businesses WHERE businesses.id = analytics.business_id AND businesses.user_id = auth.uid())
  );

-- Trigger to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', 'business_owner');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

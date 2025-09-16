export interface User {
    id: string
    email: string
    full_name?: string
    company_name?: string
    created_at: string
    updated_at: string
  }
  
  export interface Site {
    id: string
    user_id: string
    site_name: string
    template_type: string
    form_data: FormData
    generated_html?: string
    site_url?: string
    status: 'draft' | 'generated' | 'published'
    created_at: string
    updated_at: string
  }
  
  export interface Subscription {
    id: string
    user_id: string
    plan_type: 'basic' | 'pro'
    status: 'active' | 'cancelled' | 'expired'
    payment_id?: string
    expires_at?: string
    created_at: string
    updated_at: string
  }
  
  export interface FormData {
    // Step 1: Business Information
    company_name: string
    industry: string
    business_description: string
    target_audience: string
    business_goals: string
    brand_colors: string[]
    brand_fonts: string[]
    logo_url?: string
    
    // Step 2: Page Configuration
    page_type: 'single' | 'multi'
    sections: string[]
    content_tone: 'professional' | 'casual' | 'creative' | 'friendly'
    
    // Step 3: Content Preferences
    key_messages: string[]
    value_propositions: string[]
    call_to_action: string
    image_style: 'professional' | 'lifestyle' | 'minimal' | 'vibrant'
  }
  
  export type TemplateType = 'business_professional' | 'creative_agency' | 'ecommerce' | 'service_provider' | 'restaurant_food'
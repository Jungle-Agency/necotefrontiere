export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  duration?: string;
  description: string;
  features: string[];
  badge?: string;
  icon: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Général' | 'Emploi' | 'Installation' | 'Quotidien';
}

export interface Testimonial {
  name: string;
  role: string;
  location: string;
  text: string;
  avatar: string;
}

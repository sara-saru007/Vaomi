export interface LogoItem {
  name: string;
  type: 'vc' | 'fo'; // Venture Capital or Family Office
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
}

export interface NavLink {
  label: string;
  href: string;
}
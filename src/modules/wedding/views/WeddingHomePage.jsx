import { Link } from "react-router-dom";
import {
  MapPin,
  Eye,
  Calendar,
  Heart,
  Compass,
  Camera,
  Utensils,
  Music,
  ChevronRight,
} from "lucide-react";
import HeroSection from "../components/HeroSection";
import DestinationCard from "../components/DestinationCard";
import TestimonialSlider from "../components/TestimonialSlider";
import ScrollReveal from "../components/ScrollReveal";
import { destinations, budgetBuckets } from "../data/weddingData";

const steps = [
  {
    icon: Compass,
    title: "Discover",
    desc: "Browse stunning destinations across India",
  },
  { icon: Eye, title: "Visit", desc: "Tour venues virtually or in person" },
  { icon: Calendar, title: "Book", desc: "Reserve your dream date and venue" },
  {
    icon: Heart,
    title: "Celebrate",
    desc: "Let us handle the rest — you just enjoy",
  },
];

const whyUs = [
  {
    icon: MapPin,
    title: "50+ Venues",
    desc: "Curated venues across 6 destinations",
  },
  {
    icon: Camera,
    title: "Top Photographers",
    desc: "Award-winning wedding photographers",
  },
  {
    icon: Utensils,
    title: "Gourmet Catering",
    desc: "Multi-cuisine menus for every palate",
  },
  {
    icon: Music,
    title: "Entertainment",
    desc: "Live bands, DJs, and cultural performances",
  },
];

const WeddingHomePage = () => {
  return (
    <div>
      <HeroSection />

      {/* How It Works */}
      <section className="pt-8 pb-6 md:pb-16 md:pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-6 md:mb-16">
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">
                Simple Process
              </p>
              <h2
                className="text-3xl md:text-5xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                How It Works
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 gap-y-6">
            {steps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 100}>
                <div className="relative text-center group bg-white/60 backdrop-blur-lg p-3.5 sm:p-6 rounded-[1.5rem] border border-pink-100/50 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_15px_40px_-10px_rgba(157,49,61,0.15)] hover:bg-white hover:border-primary/20">
                  <div className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 rounded-full bg-primary/5 text-primary text-[10px] font-bold border border-primary/10 transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                    {i + 1}
                  </div>

                  <div className="w-11 h-11 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl wedding-gradient flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg shadow-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <step.icon className="w-5 h-5 sm:w-7 sm:h-7 text-background" />
                  </div>

                  <h3
                    className="text-base sm:text-xl font-bold mb-1 sm:mb-2 text-primary/90"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[10px] sm:text-sm text-muted-foreground leading-snug sm:leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="pt-2 pb-4 md:pb-24 px-4 wedding-gradient-soft">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-3 sm:mb-12">
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">
                Dream Locations
              </p>
              <h2
                className="text-3xl md:text-5xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Popular Destinations
              </h2>
            </div>
          </ScrollReveal>

          <div className="relative group/scroll">
            <div className="flex gap-6 overflow-x-auto overflow-y-hidden pb-6 snap-x snap-mandatory no-scrollbar scroll-smooth">
              {destinations.slice(0, 5).map((dest, i) => (
                <ScrollReveal
                  key={dest.id}
                  delay={i * 100}
                  className="min-w-[280px] sm:min-w-[320px] snap-start"
                >
                  <DestinationCard destination={dest} />
                </ScrollReveal>
              ))}
              
              {/* Mobile Scroll Indicator Arrow */}
              <div className="flex sm:hidden items-center justify-center min-w-[60px] pr-4">
                <div className="w-10 h-10 rounded-full bg-white/80 border border-primary/20 flex items-center justify-center text-primary shadow-sm animate-pulse">
                  <ChevronRight className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-2">
            <Link
              to="/wedding/destinations"
              className="inline-block px-8 py-3 rounded-full text-sm font-medium border-2 border-primary text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-105"
            >
              View All Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="pt-0 pb-6 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">
                Our Promise
              </p>
              <h2
                className="text-3xl md:text-5xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Why Choose Us
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {whyUs.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100}>
                <div className="h-full text-center p-4 sm:p-6 rounded-[1.75rem] bg-white/60 backdrop-blur-md border border-pink-100/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-12px_rgba(157,49,61,0.15)] hover:bg-white group">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-3 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/10">
                    <item.icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <h3
                    className="text-sm sm:text-lg font-bold mb-1.5"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Real Weddings Gallery */}
      <section className="pt-4 pb-6 px-4 wedding-gradient-soft">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">
                Inspiration
              </p>
              <h2
                className="text-3xl md:text-5xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Real Weddings
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
            {destinations.slice(0, 6).map((dest, i) => (
              <ScrollReveal key={dest.id} delay={i * 80}>
                <Link
                  to={`/wedding/real-weddings/by-location/${dest.id}`}
                  className="group relative block aspect-[3/2] rounded-[1.25rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <img
                    src={dest.image}
                    alt={`${dest.name} Weddings`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay Gradient - Hidden by default, shown on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Text - Hidden by default, shown on hover */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {dest.name} Wedding
                    </h3>
                    <div className="h-0.5 w-8 bg-primary" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="pt-4 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">
                Love Stories
              </p>
              <h2
                className="text-3xl md:text-5xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                What Couples Say
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <TestimonialSlider />
          </ScrollReveal>
        </div>
      </section>

      {/* Budget Buckets */}
      <section className="pt-8 pb-16 px-4 wedding-gradient-soft">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">
                For Every Budget
              </p>
              <h2
                className="text-3xl md:text-5xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Find Your Perfect Range
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {budgetBuckets.map((b, i) => (
              <ScrollReveal key={b.label} delay={i * 100}>
                <Link
                  to={`/wedding/destinations?budget=${b.label}`}
                  className="block h-full p-4 sm:p-6 rounded-[1.75rem] bg-white/60 backdrop-blur-md border border-pink-100/50 text-center transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(157,49,61,0.15)] hover:-translate-y-2 hover:bg-white hover:border-primary/20 cursor-pointer group"
                >
                  <h3
                    className="text-base sm:text-xl font-bold transition-colors duration-300 group-hover:text-primary"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {b.label}
                  </h3>
                  <p className="text-lg sm:text-2xl font-bold text-primary mt-1.5 sm:mt-2">
                    {b.range}
                  </p>
                  <p className="text-[10px] sm:text-sm text-muted-foreground mt-2 sm:mt-3 leading-relaxed">
                    {b.description}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-12 px-4 wedding-gradient">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-background mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to Begin Your Journey?
          </h2>
          <p className="text-background/80 mb-8 text-lg">
            Let us help you create the wedding of your dreams
          </p>
          <Link
            to="/wedding/enquiry"
            className="inline-block px-10 py-4 rounded-full text-base font-medium bg-background text-foreground transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            Start Planning Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WeddingHomePage;

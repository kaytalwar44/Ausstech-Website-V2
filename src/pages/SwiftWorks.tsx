import { ArrowRight, Calendar, Users, Briefcase, BarChart3 } from "lucide-react";

export default function SwiftWorks() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-navy-950 text-white">
        <div className="container mx-auto px-6 py-24">
          <span className="eyebrow">SWIFTWORKS PLATFORM</span>

          <h1 className="heading-xl max-w-4xl">
            Smarter Field Service Management For Modern Businesses
          </h1>

          <p className="body-lg mt-6 max-w-3xl text-slate-300">
            Manage jobs, technicians, customers and scheduling from a single
            powerful platform built for service businesses.
          </p>

          <div className="mt-8 flex gap-4">
            <a mo
              Request Demo
              <ArrowRight size={18} />
            </a>

            /contact
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <span className="eyebrow">FEATURES</span>
            <h2 className="heading-lg">
              Everything Your Team Needs
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="service-card">
              <div className="card-icon">
                <Briefcase />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Job Management
              </h3>
              <p className="text-ink-muted">
                Create, assign and track jobs from start to completion.
              </p>
            </div>

            <div className="service-card">
              <div className="card-icon">
                <Users />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Technician Management
              </h3>
              <p className="text-ink-muted">
                Manage technicians, workloads and performance in one place.
              </p>
            </div>

            <div className="service-card">
              <div className="card-icon">
                <Calendar />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Scheduling
              </h3>
              <p className="text-ink-muted">
                Allocate resources efficiently and improve response times.
              </p>
            </div>

            <div className="service-card">
              <div className="card-icon">
                <BarChart3 />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Reporting
              </h3>
              <p className="text-ink-muted">
                Gain business insights through real-time analytics and reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="bg-slate-50 section-padding">
        <div className="container mx-auto">
          <span className="eyebrow">WHO IT'S FOR</span>

          <h2 className="heading-lg mb-8">
            Built For Service Businesses
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "IT Service Providers",
              "Electrical Contractors",
              "Telecommunications",
              "HVAC Businesses",
              "Security Companies",
              "Maintenance Teams",
              "Field Service Providers",
              "Managed Service Providers",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center">
            <span className="eyebrow">BENEFITS</span>

            <h2 className="heading-lg mb-10">
              Why Businesses Choose SwiftWorks
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-bold text-xl mb-3">
                Save Time
              </h3>
              <p className="text-ink-muted">
                Reduce administration and manual processes.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-3">
                Improve Productivity
              </h3>
              <p className="text-ink-muted">
                Keep technicians focused on work that matters.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-3">
                Better Customer Service
              </h3>
              <p className="text-ink-muted">
                Deliver updates faster and improve customer satisfaction.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-3">
                Business Visibility
              </h3>
              <p className="text-ink-muted">
                Track jobs, customers and team performance in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="demo"
        className="bg-navy-950 text-white section-padding"
      >
        <div className="container mx-auto text-center max-w-3xl">
          <span className="eyebrow">
            REQUEST A DEMO
          </span>

          <h2 className="heading-lg mb-6">
            Ready To See SwiftWorks In Action?
          </h2>

          <p className="body-lg text-slate-300 mb-8">
            Discover how SwiftWorks can streamline operations,
            improve visibility and help your business grow.
          </p>

          /contact
            Request Demo
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <div>
      <section className="bg-gray-900 py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/cars/tesla.jpg')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Touch</span>
          </h1>
          <p className="text-gray-400 text-lg">Have a question or feedback? We'd love to hear from you.</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-6">
            {[
              { icon: "📞", title: "Call Us",  lines: ["+254 700 000 000", "Mon–Fri, 8am–8pm"] },
              { icon: "✉️", title: "Email Us", lines: ["driveeasy@gmail.com", "We reply within 24h"] },
            ].map((i) => (
              <div key={i.title} className="flex gap-4 bg-white rounded-2xl p-5 shadow-sm">
                <span className="text-2xl">{i.icon}</span>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{i.title}</h4>
                  {i.lines.map((l) => <p key={l} className="text-gray-500 text-sm">{l}</p>)}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            {sent ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500 mb-6">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition">
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Send a Message</h2>
                <form onSubmit={submit} className="space-y-4">
                  <label className="flex flex-col gap-1 text-sm font-semibold text-gray-600">
                    Your Name
                    <input name="name" value={form.name} onChange={handle} placeholder="Jane Doe" required
                      className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 bg-gray-50" />
                  </label>
                  <label className="flex flex-col gap-1 text-sm font-semibold text-gray-600">
                    Email
                    <input name="email" type="email" value={form.email} onChange={handle} placeholder="jane@example.com" required
                      className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 bg-gray-50" />
                  </label>
                  <label className="flex flex-col gap-1 text-sm font-semibold text-gray-600">
                    Message
                    <textarea name="message" value={form.message} onChange={handle} rows={4} placeholder="How can we help?" required
                      className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 bg-gray-50 resize-none" />
                  </label>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition">
                    Send Message →
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState, type FormEvent } from 'react'
import Navbar from '../components/Navbar'
import { Button } from '../components/ui/button'
import { Mail, MessageSquare, MapPin, Clock } from 'lucide-react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMsg('')

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setErrorMsg('Please fill in all fields before submitting.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid email address.')
      return
    }

    setFormState('loading')

    try {
      // Simulate async submission
      await new Promise((resolve) => setTimeout(resolve, 1200))
      setFormState('success')
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    } catch {
      setFormState('error')
      setErrorMsg('Something went wrong. Please try again later.')
    }
  }

  function handleReset() {
    setFormState('idle')
    setErrorMsg('')
  }

  const inputBase =
    'w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors min-h-[44px]'

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section
        style={{
          backgroundImage: 'url(https://loremflickr.com/1600/900/marketplace,trading,commerce)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="relative flex items-center justify-center py-28 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/65" aria-hidden="true" />
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            Have a question, feedback, or need support? We'd love to hear from you. Our team typically responds within one business day.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-12">

            {/* Contact Info */}
            <aside className="md:col-span-2 flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-6">Contact Information</h2>
                <ul className="flex flex-col gap-6">
                  <li className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Mail className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Email us</p>
                      <a
                        href="mailto:support@tradenest.com"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded"
                      >
                        support@tradenest.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <MessageSquare className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Live chat</p>
                      <p className="text-sm text-muted-foreground">Available Mon–Fri, 9am–6pm EST</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <MapPin className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Headquarters</p>
                      <p className="text-sm text-muted-foreground">123 Market Street, San Francisco, CA 94105</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Clock className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Response time</p>
                      <p className="text-sm text-muted-foreground">Within 1 business day</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-muted/40 p-6">
                <p className="text-sm font-semibold text-foreground mb-1">🛒 Buying or selling?</p>
                <p className="text-sm text-muted-foreground">
                  For listing disputes or transaction issues, please include your listing ID in the message so we can help you faster.
                </p>
              </div>
            </aside>

            {/* Form */}
            <div className="md:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                {formState === 'success' ? (
                  <div
                    role="alert"
                    aria-live="polite"
                    className="flex flex-col items-center justify-center text-center py-12 gap-6"
                  >
                    <span className="text-6xl" aria-hidden="true">✅</span>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Message sent!</h3>
                      <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
                        Thanks for reaching out. We've received your message and will get back to you within one business day.
                      </p>
                    </div>
                    <Button variant="outline" onClick={handleReset} className="min-h-[44px]">
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-foreground mb-6">Send us a message</h2>

                    {errorMsg && (
                      <div
                        role="alert"
                        aria-live="assertive"
                        className="mb-6 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                      >
                        {errorMsg}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
                            Full name <span className="text-destructive" aria-hidden="true">*</span>
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            autoComplete="name"
                            required
                            placeholder="Jane Smith"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={inputBase}
                            disabled={formState === 'loading'}
                            aria-required="true"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
                            Email address <span className="text-destructive" aria-hidden="true">*</span>
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="jane@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputBase}
                            disabled={formState === 'loading'}
                            aria-required="true"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="contact-subject" className="text-sm font-medium text-foreground">
                          Subject <span className="text-destructive" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="contact-subject"
                          type="text"
                          required
                          placeholder="How can we help?"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className={inputBase}
                          disabled={formState === 'loading'}
                          aria-required="true"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
                          Message <span className="text-destructive" aria-hidden="true">*</span>
                        </label>
                        <textarea
                          id="contact-message"
                          required
                          rows={6}
                          placeholder="Tell us more about your question or issue..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className={`${inputBase} resize-y min-h-[140px]`}
                          disabled={formState === 'loading'}
                          aria-required="true"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={formState === 'loading'}
                        className="min-h-[48px] w-full sm:w-auto sm:self-start mt-1"
                        aria-busy={formState === 'loading'}
                      >
                        {formState === 'loading' ? 'Sending…' : 'Send message'}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-12" />
    </div>
  )
}

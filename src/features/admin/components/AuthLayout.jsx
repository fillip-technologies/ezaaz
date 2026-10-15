import logoWhiteImg from '../../../assets/Logo_white_text.png'

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#002244] via-[#003a70] to-[#00527f] px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <img src={logoWhiteImg} alt="Ejaz Hospital" className="h-20 w-auto" />
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-200/80">Admin Panel</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-2xl shadow-black/20 sm:p-8">
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          {subtitle && <p className="mt-1.5 text-sm text-slate-500">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>
        <p className="mt-6 text-center text-xs text-sky-100/60">
          © {new Date().getFullYear()} Ejaz Hospital. Authorised staff only.
        </p>
      </div>
    </div>
  )
}

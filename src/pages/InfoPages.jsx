import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from '../lib/sweetAlertToast';

const supportTickets = [
  {
    title: 'Access to digital downloads',
    category: 'Compras',
    description: 'Guía para recuperar acceso, validar pagos y descargar archivos comprados.',
    path: '/rastrear-pedido',
  },
  {
    title: 'Account and security',
    category: 'Cuenta',
    description: 'Buenas prácticas para proteger tu cuenta, correo y compras digitales.',
    path: '/politica-privacidad',
  },
  {
    title: 'Licensing and usage',
    category: 'Licencias',
    description: 'Diferencias entre uso personal, comercial y extendido.',
    path: '/terminos-servicio',
  },
  {
    title: 'Seller onboarding',
    category: 'Vendedores',
    description: 'Requisitos básicos para publicar productos digitales en EvoHance.',
    path: '/programa-afiliados',
  },
];

const docs = [
  {
    title: 'Getting started',
    tag: 'Inicio',
    description: 'Configura tu cuenta, explora categorías y guarda productos favoritos.',
    steps: ['Crea o inicia sesión en tu cuenta.', 'Explora el catálogo por categoría.', 'Agrega productos al carrito o a favoritos.'],
  },
  {
    title: 'Download flow',
    tag: 'Compras',
    description: 'Proceso recomendado para validar compra y acceder al producto digital.',
    steps: ['Completa el pago.', 'Revisa tu correo de confirmación.', 'Usa el rastreador si tu acceso tarda en aparecer.'],
  },
  {
    title: 'Seller workflow',
    tag: 'Vendedores',
    description: 'Flujo básico para preparar un producto digital antes de publicarlo.',
    steps: ['Prepara imágenes y descripción.', 'Define precio, oferta e inventario.', 'Publica y monitorea métricas desde backoffice.'],
  },
];

const apiEndpoints = [
  {
    method: 'GET',
    path: '/api/products',
    description: 'Lista productos visibles con filtros opcionales por categoría y búsqueda.',
    response: '{ "data": [{ "id": "prod_01", "title": "Dashboard Kit", "price": 105 }] }',
  },
  {
    method: 'GET',
    path: '/api/orders/:id',
    description: 'Consulta el estado simulado de un pedido digital.',
    response: '{ "id": "ORD-2026-001", "status": "processing" }',
  },
  {
    method: 'POST',
    path: '/api/newsletter/subscriptions',
    description: 'Registra un correo para recibir ofertas y actualizaciones.',
    response: '{ "ok": true, "message": "Subscription confirmed" }',
  },
];

const communityPosts = [
  {
    author: 'Mariana Dev',
    title: 'Checklist para vender plantillas digitales',
    replies: 12,
    tag: 'Vendedores',
  },
  {
    author: 'Carlos UI',
    title: 'Cómo organizar assets para clientes SaaS',
    replies: 8,
    tag: 'Diseño',
  },
  {
    author: 'Nora Stack',
    title: 'Ideas para automatizar soporte post-compra',
    replies: 17,
    tag: 'Automatización',
  },
];

const faqs = [
  {
    question: '¿Cómo recibo mi producto?',
    answer: 'Después de confirmar el pago, el acceso queda ligado a tu cuenta y correo de compra.',
  },
  {
    question: '¿Puedo pedir reembolso?',
    answer: 'Podés solicitar revisión si el producto no coincide con lo ofrecido o no podés acceder al archivo.',
  },
  {
    question: '¿Puedo usar los productos comercialmente?',
    answer: 'Depende de la licencia indicada en cada producto. Revisá la ficha antes de comprar.',
  },
  {
    question: '¿Cómo contacto soporte?',
    answer: 'Usá la página de contacto o escribí a support@evohance.com con tu correo de compra.',
  },
  {
    question: '¿Cómo vendo mis productos?',
    answer: 'Necesitás iniciar sesión, completar tu perfil de vendedor y publicar desde el backoffice.',
  },
];

const blogPosts = [
  {
    title: 'Cómo preparar un producto digital que sí vende',
    category: 'Ventas',
    readTime: '6 min',
    excerpt: 'Estructura, screenshots, pricing y confianza: lo mínimo para publicar con calidad.',
  },
  {
    title: 'Buenas prácticas para dashboards premium',
    category: 'UI/UX',
    readTime: '8 min',
    excerpt: 'Jerarquía visual, estados vacíos y componentes reutilizables para productos más sólidos.',
  },
  {
    title: 'Automatiza tu entrega digital sin complicarte',
    category: 'Operaciones',
    readTime: '5 min',
    excerpt: 'Ideas simples para que compra, acceso y soporte no dependan de tareas manuales.',
  },
];

const partnerBenefits = [
  'Acceso a campañas conjuntas de lanzamiento.',
  'Visibilidad para productos digitales seleccionados.',
  'Soporte para integraciones, bundles y promociones.',
];

function getFilteredItems(items, query, keys) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return items;

  return items.filter((item) =>
    keys.some((key) => String(item[key] ?? '').toLowerCase().includes(normalizedQuery))
  );
}

function copyText(text, successMessage) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => null);
  }

  toast.success(successMessage);
}

function PageShell({ eyebrow, title, description, children, backTo = '/' }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-20 text-white">
      <div className="fixed inset-0 -z-10 bg-[#0a0a0a]" />
      <div
        className="fixed inset-0 -z-10 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(249, 182, 29, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(249, 182, 29, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container mx-auto max-w-6xl px-4">
        <Link
          to={backTo}
          className="mb-8 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-amber-400 transition-colors hover:border-amber-400/40 hover:bg-white/5"
        >
          <span aria-hidden="true">←</span>
          Volver
        </Link>

        <header className="mb-10 max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-amber-400">{eyebrow}</p>
          <h1 className="mb-4 text-4xl font-display md:text-6xl">{title}</h1>
          <p className="text-lg leading-8 text-gray-400">{description}</p>
        </header>

        {children}
      </div>
    </div>
  );
}

function SectionCard({ children, className = '' }) {
  return (
    <section className={`rounded-3xl border border-white/10 bg-[#111115]/95 p-6 shadow-2xl ${className}`}>
      {children}
    </section>
  );
}

function SearchBox({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-amber-500/25 bg-black/50 px-5 py-4 text-white outline-none transition-colors placeholder:text-gray-500 focus:border-amber-400"
    />
  );
}

function SubmitButton({ children }) {
  return (
    <button className="rounded-2xl bg-amber-500 px-6 py-3 font-bold text-black transition-colors hover:bg-amber-400">
      {children}
    </button>
  );
}

PageShell.propTypes = {
  backTo: PropTypes.string,
  children: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  eyebrow: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

SectionCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

SearchBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

SubmitButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export function HelpCenterPage() {
  const [query, setQuery] = useState('');
  const filteredTopics = useMemo(
    () => getFilteredItems(supportTickets, query, ['title', 'category', 'description']),
    [query]
  );

  return (
    <PageShell
      eyebrow="Soporte"
      title="Centro de ayuda"
      description="Encuentra rutas rápidas para resolver dudas sobre compras, descargas, licencias y cuentas."
    >
      <div className="mb-8 grid gap-4 md:grid-cols-[1fr_auto]">
        <SearchBox value={query} onChange={setQuery} placeholder="Buscar ayuda por tema, cuenta, licencia..." />
        <Link to="/contactanos" className="rounded-2xl border border-amber-500/30 px-6 py-4 text-center font-bold text-amber-300 hover:bg-amber-500/10">
          Contactar soporte
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {filteredTopics.map((topic) => (
          <SectionCard key={topic.title}>
            <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-300">{topic.category}</span>
            <h2 className="mt-4 text-2xl font-display text-[#E4D9AF]">{topic.title}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">{topic.description}</p>
            <Link to={topic.path} className="mt-5 inline-flex text-sm font-bold text-amber-400 hover:text-amber-300">
              Abrir guía →
            </Link>
          </SectionCard>
        ))}
      </div>
    </PageShell>
  );
}

export function DocumentationPage() {
  const [query, setQuery] = useState('');
  const filteredDocs = useMemo(() => getFilteredItems(docs, query, ['title', 'tag', 'description']), [query]);

  return (
    <PageShell
      eyebrow="Guías"
      title="Documentación"
      description="Documentación práctica para compradores, vendedores y equipos que usan EvoHance."
    >
      <div className="mb-8">
        <SearchBox value={query} onChange={setQuery} placeholder="Buscar documentación..." />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {filteredDocs.map((doc) => (
          <SectionCard key={doc.title}>
            <p className="text-xs uppercase tracking-[0.2em] text-amber-400">{doc.tag}</p>
            <h2 className="mt-3 text-2xl font-display text-[#E4D9AF]">{doc.title}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">{doc.description}</p>
            <ol className="mt-5 space-y-3 text-sm text-gray-300">
              {doc.steps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="text-amber-400">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </SectionCard>
        ))}
      </div>
    </PageShell>
  );
}

export function ApiReferencePage() {
  const [selectedPath, setSelectedPath] = useState(apiEndpoints[0].path);
  const selectedEndpoint = apiEndpoints.find((endpoint) => endpoint.path === selectedPath) ?? apiEndpoints[0];
  const curlCommand = `curl -X ${selectedEndpoint.method} https://api.evohance.com${selectedEndpoint.path}`;

  return (
    <PageShell
      eyebrow="Developers"
      title="Referencia API"
      description="Referencia funcional simulada para entender cómo exponer productos, pedidos y suscripciones."
    >
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <SectionCard>
          <h2 className="mb-4 text-xl font-display text-[#E4D9AF]">Endpoints</h2>
          <div className="space-y-3">
            {apiEndpoints.map((endpoint) => (
              <button
                key={endpoint.path}
                onClick={() => setSelectedPath(endpoint.path)}
                className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                  selectedPath === endpoint.path
                    ? 'border-amber-400 bg-amber-500/10 text-amber-200'
                    : 'border-white/10 bg-black/30 text-gray-300 hover:border-amber-500/40'
                }`}
              >
                <span className="mr-3 text-xs font-bold text-amber-400">{endpoint.method}</span>
                {endpoint.path}
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard>
          <p className="text-sm font-bold text-amber-400">{selectedEndpoint.method}</p>
          <h2 className="mt-2 text-3xl font-display text-[#E4D9AF]">{selectedEndpoint.path}</h2>
          <p className="mt-4 text-gray-400">{selectedEndpoint.description}</p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/50 p-4">
            <div className="mb-3 flex items-center justify-between gap-4">
              <span className="text-sm text-gray-400">cURL</span>
              <button onClick={() => copyText(curlCommand, 'Comando copiado')} className="text-sm font-bold text-amber-400">
                Copiar
              </button>
            </div>
            <code className="block overflow-x-auto text-sm text-gray-200">{curlCommand}</code>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/50 p-4">
            <p className="mb-3 text-sm text-gray-400">Respuesta ejemplo</p>
            <pre className="overflow-x-auto text-sm text-amber-100">{selectedEndpoint.response}</pre>
          </div>
        </SectionCard>
      </div>
    </PageShell>
  );
}

export function CommunityPage() {
  const [posts, setPosts] = useState(communityPosts);
  const [title, setTitle] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim()) {
      toast.warning('Escribí un tema para publicar');
      return;
    }

    setPosts([{ author: 'Tú', title: title.trim(), replies: 0, tag: 'Nuevo' }, ...posts]);
    setTitle('');
    toast.success('Tema publicado en la comunidad');
  }

  return (
    <PageShell
      eyebrow="Comunidad"
      title="Comunidad EvoHance"
      description="Un espacio para compartir dudas, ideas de productos digitales y aprendizajes con otros creadores."
    >
      <SectionCard className="mb-6">
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-[1fr_auto]">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Publica una pregunta o idea..."
            className="rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none focus:border-amber-400"
          />
          <SubmitButton>Publicar</SubmitButton>
        </form>
      </SectionCard>

      <div className="grid gap-4">
        {posts.map((post) => (
          <SectionCard key={`${post.author}-${post.title}`}>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-amber-300">{post.tag}</span>
                <h2 className="mt-3 text-2xl font-display text-[#E4D9AF]">{post.title}</h2>
                <p className="text-sm text-gray-400">Publicado por {post.author}</p>
              </div>
              <p className="text-sm text-gray-300">{post.replies} respuestas</p>
            </div>
          </SectionCard>
        ))}
      </div>
    </PageShell>
  );
}

export function ContactanosPage() {
  const [form, setForm] = useState({ name: '', email: '', topic: 'Soporte', message: '' });

  function updateField(field, value) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Completa nombre, correo y mensaje');
      return;
    }

    toast.success('Mensaje enviado', { description: 'Te responderemos por correo lo antes posible.' });
    setForm({ name: '', email: '', topic: 'Soporte', message: '' });
  }

  return (
    <PageShell
      eyebrow="Contacto"
      title="Contáctanos"
      description="Envíanos dudas de compra, soporte técnico o propuestas comerciales desde un formulario funcional."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <SectionCard>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <input value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Nombre" className="rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none focus:border-amber-400" />
              <input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="Correo" className="rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none focus:border-amber-400" />
            </div>
            <select value={form.topic} onChange={(event) => updateField('topic', event.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none focus:border-amber-400">
              <option>Soporte</option>
              <option>Compras</option>
              <option>Alianzas</option>
              <option>Vendedores</option>
            </select>
            <textarea value={form.message} onChange={(event) => updateField('message', event.target.value)} placeholder="Cuéntanos qué necesitas..." rows="6" className="w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none focus:border-amber-400" />
            <SubmitButton>Enviar mensaje</SubmitButton>
          </form>
        </SectionCard>

        <SectionCard>
          <h2 className="text-2xl font-display text-[#E4D9AF]">Canales directos</h2>
          <div className="mt-5 space-y-4 text-sm text-gray-300">
            <p>Correo: <a className="text-amber-400" href="mailto:support@evohance.com">support@evohance.com</a></p>
            <p>Horario: Lunes a viernes, 09:00 - 18:00 CDMX</p>
            <p>Tiempo estimado de respuesta: 24 a 48 horas hábiles.</p>
          </div>
        </SectionCard>
      </div>
    </PageShell>
  );
}

export function PreguntasFrecuentesPage() {
  const [query, setQuery] = useState('');
  const filteredFaqs = useMemo(() => getFilteredItems(faqs, query, ['question', 'answer']), [query]);

  return (
    <PageShell
      eyebrow="Soporte"
      title="Preguntas frecuentes"
      description="Respuestas rápidas a las dudas más comunes sobre compras, licencias, soporte y vendedores."
    >
      <div className="mb-8">
        <SearchBox value={query} onChange={setQuery} placeholder="Buscar preguntas frecuentes..." />
      </div>
      <SectionCard>
        <div className="divide-y divide-white/10">
          {filteredFaqs.map((faq) => (
            <details key={faq.question} className="group py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-3 py-4 text-[#E4D9AF] transition-colors hover:bg-white/5">
                <span>{faq.question}</span>
                <span className="text-xl text-amber-400 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="px-3 pb-4 text-sm leading-7 text-gray-400">{faq.answer}</p>
            </details>
          ))}
        </div>
      </SectionCard>
    </PageShell>
  );
}

export function SobreNosotrosPage() {
  return (
    <PageShell
      eyebrow="Compañía"
      title="Sobre Nosotros"
      description="EvoHance conecta creadores, desarrolladores y compradores con productos digitales listos para usar."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {[
          ['+100', 'creadores en comunidad'],
          ['24/7', 'catálogo digital disponible'],
          ['3', 'verticales principales: plantillas, UI y herramientas'],
        ].map(([value, label]) => (
          <SectionCard key={label}>
            <p className="text-4xl font-display text-amber-400">{value}</p>
            <p className="mt-2 text-sm text-gray-400">{label}</p>
          </SectionCard>
        ))}
      </div>
      <SectionCard className="mt-6">
        <h2 className="text-3xl font-display text-[#E4D9AF]">Nuestra misión</h2>
        <p className="mt-4 max-w-3xl text-gray-400">
          Ayudar a creadores y equipos técnicos a vender, descubrir y reutilizar activos digitales de calidad sin fricción.
        </p>
      </SectionCard>
    </PageShell>
  );
}

export function BlogPage() {
  const [category, setCategory] = useState('Todos');
  const categories = ['Todos', ...new Set(blogPosts.map((post) => post.category))];
  const filteredPosts = category === 'Todos' ? blogPosts : blogPosts.filter((post) => post.category === category);

  return (
    <PageShell
      eyebrow="Contenido"
      title="Blog"
      description="Ideas prácticas para mejorar productos digitales, marketing, UI y operación de ecommerce."
    >
      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((item) => (
          <button key={item} onClick={() => setCategory(item)} className={`rounded-full border px-4 py-2 text-sm ${category === item ? 'border-amber-400 bg-amber-500/10 text-amber-200' : 'border-white/10 text-gray-300 hover:border-amber-500/40'}`}>
            {item}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {filteredPosts.map((post) => (
          <SectionCard key={post.title}>
            <p className="text-xs uppercase tracking-[0.2em] text-amber-400">{post.category} · {post.readTime}</p>
            <h2 className="mt-4 text-2xl font-display text-[#E4D9AF]">{post.title}</h2>
            <p className="mt-4 text-sm leading-6 text-gray-400">{post.excerpt}</p>
            <button onClick={() => toast.info('Artículo en preparación')} className="mt-5 text-sm font-bold text-amber-400">
              Leer artículo →
            </button>
          </SectionCard>
        ))}
      </div>
    </PageShell>
  );
}

export function SociosPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    toast.success('Solicitud de socio enviada');
  }

  return (
    <PageShell
      eyebrow="Alianzas"
      title="Socios"
      description="Colabora con EvoHance mediante bundles, integraciones, campañas conjuntas y productos seleccionados."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard>
          <h2 className="text-3xl font-display text-[#E4D9AF]">Beneficios</h2>
          <ul className="mt-5 space-y-4 text-gray-300">
            {partnerBenefits.map((benefit) => (
              <li key={benefit} className="flex gap-3"><span className="text-amber-400">✦</span>{benefit}</li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard>
          {submitted ? (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-amber-100">Recibimos tu solicitud. Revisaremos si encaja con el catálogo.</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required placeholder="Nombre de la empresa" className="w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none focus:border-amber-400" />
              <input required type="email" placeholder="Correo de contacto" className="w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none focus:border-amber-400" />
              <textarea required rows="5" placeholder="Cuéntanos tu propuesta..." className="w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none focus:border-amber-400" />
              <SubmitButton>Enviar propuesta</SubmitButton>
            </form>
          )}
        </SectionCard>
      </div>
    </PageShell>
  );
}

export function ProgramaAfiliadosPage() {
  const [sales, setSales] = useState(10);
  const [averageOrder, setAverageOrder] = useState(120);
  const commission = Math.round(sales * averageOrder * 0.18);

  function handleSubmit(event) {
    event.preventDefault();
    toast.success('Solicitud de afiliado enviada', { description: 'Te contactaremos para validar tu perfil.' });
  }

  return (
    <PageShell
      eyebrow="Afiliados"
      title="Programa de Afiliados"
      description="Simula tus comisiones y aplica para recomendar productos digitales de EvoHance."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard>
          <h2 className="text-3xl font-display text-[#E4D9AF]">Calculadora de comisión</h2>
          <div className="mt-6 space-y-5">
            <label className="block text-sm text-gray-300">Ventas mensuales
              <input type="number" min="0" value={sales} onChange={(event) => setSales(Number(event.target.value))} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none focus:border-amber-400" />
            </label>
            <label className="block text-sm text-gray-300">Ticket promedio
              <input type="number" min="0" value={averageOrder} onChange={(event) => setAverageOrder(Number(event.target.value))} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none focus:border-amber-400" />
            </label>
          </div>
          <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5">
            <p className="text-sm text-gray-300">Comisión estimada 18%</p>
            <p className="mt-2 text-4xl font-display text-amber-300">${commission.toLocaleString('en-US')}</p>
          </div>
        </SectionCard>

        <SectionCard>
          <h2 className="mb-5 text-3xl font-display text-[#E4D9AF]">Aplicar</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input required placeholder="Nombre" className="w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none focus:border-amber-400" />
            <input required type="email" placeholder="Correo" className="w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none focus:border-amber-400" />
            <input required placeholder="Canal principal: YouTube, blog, comunidad..." className="w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none focus:border-amber-400" />
            <SubmitButton>Enviar solicitud</SubmitButton>
          </form>
        </SectionCard>
      </div>
    </PageShell>
  );
}

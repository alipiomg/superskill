import { motion } from 'framer-motion';
import { Paintbrush, Sparkles, ArrowRight } from 'lucide-react';
import BrandSkillDemo from '../components/BrandSkillDemo';
import { Link } from 'react-router-dom';

export default function BrandExample() {
  return (
    <div className="min-h-screen px-6 py-8 lg:py-12">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forge-500/10 border border-forge-500/30 text-forge-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Ejemplo práctico del curso
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-white mb-3">
              Skill de{' '}
              <span className="bg-gradient-to-r from-forge-400 to-ember-400 bg-clip-text text-transparent">
                Marca Personal
              </span>
            </h1>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
              Crea tu propio plugin de branding que añade tu marca a todos los documentos.
              Un ejemplo real de cómo aplicar SuperSkills a tu negocio.
            </p>
          </div>

          {/* What you'll build */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              { title: 'Plugin de Marca', desc: 'Configura colores, tipografía, logo y datos de tu empresa', icon: Paintbrush },
              { title: 'Plantillas Branded', desc: 'Genera informes, emails y propuestas con tu identidad visual', icon: Sparkles },
              { title: 'Instalable en Claude', desc: 'Plugin listo para instalar en tu carpeta .claude y usar al instante', icon: ArrowRight },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800"
              >
                <item.icon className="w-6 h-6 text-forge-400 mb-3" />
                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                <p className="text-zinc-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interactive Demo */}
        <BrandSkillDemo />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-forge-500/10 to-ember-500/10 border border-forge-500/30 text-center"
        >
          <h3 className="text-xl font-bold text-white mb-2">¿Quieres crear más skills para tu negocio?</h3>
          <p className="text-zinc-400 mb-4">Usa el SuperConstructor para generar skills personalizadas en segundos</p>
          <div className="flex gap-3 justify-center">
            <Link to="/constructor" className="px-6 py-3 rounded-xl bg-forge-500 text-white font-semibold hover:bg-forge-600 transition-colors">
              Ir al Constructor
            </Link>
            <Link to="/agentes" className="px-6 py-3 rounded-xl bg-zinc-800 text-white font-semibold hover:bg-zinc-700 transition-colors">
              Ver ARTgents
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

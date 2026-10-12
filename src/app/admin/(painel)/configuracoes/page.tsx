import { SettingsForm } from "@/app/admin/(painel)/configuracoes/settings-form";
import { getSettings } from "@/lib/content/settings";

export default async function AdminSettings() {
  const settings = await getSettings();
  return (
    <>
      <p className="eyebrow">Configurações</p>
      <h1 className="display mt-4 text-4xl md:text-5xl">Contato e textos</h1>
      <p className="mt-3 max-w-2xl text-stone">
        Estas informações aparecem no cabeçalho, no rodapé, na página de contato, nos botões de WhatsApp e no topo da página inicial.
      </p>
      <div className="mt-10">
        <SettingsForm settings={settings} />
      </div>
    </>
  );
}

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Check,
  Edit3,
  Leaf,
  MapPin,
  PackageOpen,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { api } from "./api";
import type { Item, ItemFormData, ItemStatus } from "./types";

const categories = ["Todas", "Roupas", "Móveis", "Eletrônicos", "Livros", "Esportes", "Outros"];
const conditions = ["Novo", "Muito bom", "Bom", "Usado"];

const emptyForm: ItemFormData = {
  title: "",
  description: "",
  category: "",
  condition: "",
  city: "",
  contact: "",
  imageUrl: "",
  status: "DISPONIVEL",
};

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [status, setStatus] = useState("TODOS");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [form, setForm] = useState<ItemFormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  const availableCount = useMemo(
    () => items.filter((item) => item.status === "DISPONIVEL").length,
    [items],
  );

  async function loadItems() {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());
      if (category !== "Todas") params.set("category", category);
      if (status !== "TODOS") params.set("status", status);
      const query = params.toString() ? `?${params.toString()}` : "";
      setItems(await api.list(query));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Erro ao carregar os itens.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timeout = window.setTimeout(loadItems, 250);
    return () => window.clearTimeout(timeout);
  }, [search, category, status]);

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2800);
  }

  function openCreateModal() {
    setEditingItem(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  }

  function openEditModal(item: Item) {
    setEditingItem(item);
    setForm({
      title: item.title,
      description: item.description,
      category: item.category,
      condition: item.condition,
      city: item.city,
      contact: item.contact,
      imageUrl: item.imageUrl ?? "",
      status: item.status,
    });
    setIsModalOpen(true);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editingItem) {
        await api.update(editingItem.id, form);
        showNotice("Anúncio atualizado com sucesso.");
      } else {
        await api.create(form);
        showNotice("Item anunciado com sucesso.");
      }
      setIsModalOpen(false);
      await loadItems();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Erro ao salvar o item.");
    } finally {
      setSaving(false);
    }
  }

  async function handleStatus(id: number, currentStatus: ItemStatus) {
    const nextStatus = currentStatus === "DISPONIVEL" ? "DOADO" : "DISPONIVEL";
    try {
      await api.updateStatus(id, nextStatus);
      showNotice(nextStatus === "DOADO" ? "Item marcado como doado." : "Item disponível novamente.");
      await loadItems();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Erro ao alterar o status.");
    }
  }

  async function handleDelete(item: Item) {
    if (!window.confirm(`Deseja excluir o anúncio “${item.title}”?`)) return;
    try {
      await api.remove(item.id);
      showNotice("Anúncio excluído.");
      await loadItems();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Erro ao excluir o item.");
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Página inicial do ReUse Hub">
          <span className="brand-mark"><Leaf size={23} strokeWidth={2.4} /></span>
          <span>ReUse <strong>Hub</strong></span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#itens">Explorar itens</a>
          <a href="#sobre">Sobre</a>
          <button className="button button-primary button-small" onClick={openCreateModal}>
            <Plus size={18} /> Anunciar item
          </button>
        </nav>
      </header>

      <main id="inicio">
        <section className="intro" aria-labelledby="intro-title">
          <div className="intro-copy">
            <span className="eyebrow"><Leaf size={15} /> Consumo consciente na prática</span>
            <h1 id="intro-title">O que não serve mais para você pode ser útil para alguém.</h1>
            <p>Doe objetos, evite o descarte desnecessário e ajude a criar uma comunidade mais sustentável.</p>
            <button className="button button-primary" onClick={openCreateModal}>
              <Plus size={20} /> Quero doar um item
            </button>
          </div>
          <div className="impact-card" aria-label="Resumo dos itens cadastrados">
            <div className="impact-icon"><PackageOpen size={34} /></div>
            <strong>{availableCount}</strong>
            <span>{availableCount === 1 ? "item disponível" : "itens disponíveis"}</span>
            <small>Cada doação evita um novo descarte.</small>
          </div>
        </section>

        <section className="catalog" id="itens" aria-labelledby="catalog-title">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Encontre perto de você</span>
              <h2 id="catalog-title">Itens para uma nova história</h2>
            </div>
          </div>

          <div className="filters">
            <label className="search-field">
              <Search size={20} aria-hidden="true" />
              <span className="sr-only">Buscar itens</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar por item ou cidade..."
              />
            </label>
            <label>
              <span className="sr-only">Categoria</span>
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                {categories.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
            <label>
              <span className="sr-only">Situação</span>
              <select value={status} onChange={(event) => setStatus(event.target.value)}>
                <option value="TODOS">Todos os status</option>
                <option value="DISPONIVEL">Disponíveis</option>
                <option value="DOADO">Doados</option>
              </select>
            </label>
          </div>

          {error && <div className="alert" role="alert">{error}</div>}

          {loading ? (
            <div className="loading-grid" aria-label="Carregando itens">
              {[1, 2, 3].map((number) => <div className="skeleton" key={number} />)}
            </div>
          ) : items.length === 0 ? (
            <div className="empty-state">
              <PackageOpen size={42} />
              <h3>Nenhum item encontrado</h3>
              <p>Tente mudar os filtros ou publique o primeiro item desta categoria.</p>
            </div>
          ) : (
            <div className="item-grid">
              {items.map((item) => (
                <article className={`item-card ${item.status === "DOADO" ? "item-card-donated" : ""}`} key={item.id}>
                  <div className="item-image">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={`Foto de ${item.title}`} />
                    ) : (
                      <div className="image-placeholder"><PackageOpen size={42} /><span>Sem foto</span></div>
                    )}
                    <span className={`status-badge ${item.status === "DOADO" ? "status-donated" : ""}`}>
                      {item.status === "DISPONIVEL" ? "Disponível" : "Doado"}
                    </span>
                  </div>
                  <div className="item-content">
                    <div className="item-meta"><span>{item.category}</span><span>{item.condition}</span></div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="location"><MapPin size={16} /> {item.city}</div>
                    <div className="contact"><span>Contato</span><strong>{item.contact}</strong></div>
                    <div className="card-actions">
                      <button className="icon-button" onClick={() => openEditModal(item)} aria-label={`Editar ${item.title}`} title="Editar">
                        <Edit3 size={18} />
                      </button>
                      <button className="icon-button danger" onClick={() => handleDelete(item)} aria-label={`Excluir ${item.title}`} title="Excluir">
                        <Trash2 size={18} />
                      </button>
                      <button className="button button-secondary status-action" onClick={() => handleStatus(item.id, item.status)}>
                        <Check size={18} />
                        {item.status === "DISPONIVEL" ? "Marcar como doado" : "Tornar disponível"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="about" id="sobre">
          <span className="section-kicker">Sobre o projeto</span>
          <h2>Menos descarte, mais reaproveitamento.</h2>
          <p>O ReUse Hub aproxima pessoas que possuem objetos sem uso de quem realmente precisa deles. A proposta é simples: prolongar a vida útil dos produtos e incentivar hábitos mais responsáveis.</p>
        </section>
      </main>

      <footer>
        <div className="brand"><span className="brand-mark"><Leaf size={19} /></span><span>ReUse <strong>Hub</strong></span></div>
        <p>Projeto acadêmico desenvolvido por EcoForge.</p>
      </footer>

      {notice && <div className="toast" role="status"><Check size={18} /> {notice}</div>}

      {isModalOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setIsModalOpen(false)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <div><span className="section-kicker">Compartilhe, não descarte</span><h2 id="modal-title">{editingItem ? "Editar anúncio" : "Anunciar um item"}</h2></div>
              <button className="icon-button" onClick={() => setIsModalOpen(false)} aria-label="Fechar"><X size={21} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <label className="field field-full"><span>Nome do item</span><input required minLength={3} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Ex.: Mesa de estudos" /></label>
                <label className="field"><span>Categoria</span><select required value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}><option value="">Selecione</option>{categories.slice(1).map((option) => <option key={option}>{option}</option>)}</select></label>
                <label className="field"><span>Estado de conservação</span><select required value={form.condition} onChange={(event) => setForm({ ...form, condition: event.target.value })}><option value="">Selecione</option>{conditions.map((option) => <option key={option}>{option}</option>)}</select></label>
                <label className="field field-full"><span>Descrição</span><textarea required minLength={10} rows={4} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Conte um pouco sobre o item..." /></label>
                <label className="field"><span>Cidade</span><input required value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} placeholder="Cidade - UF" /></label>
                <label className="field"><span>Contato</span><input required value={form.contact} onChange={(event) => setForm({ ...form, contact: event.target.value })} placeholder="E-mail ou telefone" /></label>
                <label className="field field-full"><span>URL da foto <small>(opcional)</small></span><input type="url" value={form.imageUrl ?? ""} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} placeholder="https://exemplo.com/foto.jpg" /></label>
              </div>
              <div className="modal-actions"><button type="button" className="button button-ghost" onClick={() => setIsModalOpen(false)}>Cancelar</button><button className="button button-primary" disabled={saving}>{saving ? "Salvando..." : editingItem ? "Salvar alterações" : "Publicar item"}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

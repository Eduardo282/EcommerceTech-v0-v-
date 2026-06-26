import { COMPONENTS_DATA, getComponentPrice } from '../pages/ComponentesUiUxPage.data';
import { DRIVERS_DATA, mapDriverToProduct } from '../pages/ControladoresPage.data';
import { GUIDES_DATA, mapGuideToProduct } from '../pages/GuiasEstudioPage.data';
import { BOOKS_DATA, mapBookToProduct } from '../pages/LibrosProgramacionPage.data';
import { AUTH_TEMPLATES } from '../pages/PlantillasAuthPage.data';
import { DASHBOARD_TEMPLATES } from '../pages/PlantillasDashboardPage.data';
import { toSearchItem } from './catalogSearch';

let cachedStaticCatalogItems = null;

export function getStaticCatalogItems() {
  if (cachedStaticCatalogItems) return cachedStaticCatalogItems;

  cachedStaticCatalogItems = [
    ...COMPONENTS_DATA.map((component) =>
      toSearchItem(
        {
          id: `uiux-${component.id}`,
          name: component.title,
          category: component.category,
          description: component.description,
          features: component.tags,
          price: getComponentPrice(component),
        },
        '/componentes-ui-ux',
        'Componente UI/UX'
      )
    ),
    ...AUTH_TEMPLATES.map((template) =>
      toSearchItem(
        {
          id: `auth-${template.id}`,
          name: template.name,
          category: template.type,
          description: template.description,
          features: template.features,
        },
        '/plantillas-auth',
        'Plantilla Auth'
      )
    ),
    ...DASHBOARD_TEMPLATES.map((template) =>
      toSearchItem(
        {
          id: `dashboard-${template.id}`,
          name: template.title,
          category: template.category,
          price: template.price,
        },
        '/plantillas-dashboard',
        'Dashboard'
      )
    ),
    ...BOOKS_DATA.map((book) =>
      toSearchItem(mapBookToProduct(book), '/libros-programacion', 'Libro')
    ),
    ...GUIDES_DATA.map((guide) => toSearchItem(mapGuideToProduct(guide), '/guias-estudio', 'Guía')),
    ...DRIVERS_DATA.map((driver) =>
      toSearchItem(mapDriverToProduct(driver), '/controladores', 'Controlador')
    ),
  ];

  return cachedStaticCatalogItems;
}

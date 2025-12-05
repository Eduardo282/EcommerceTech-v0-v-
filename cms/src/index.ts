// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    try {
      const publicRole = await strapi
        .db.query("plugin::users-permissions.role")
        .findOne({ where: { type: "public" } });

      if (!publicRole) return;

      const permissions = [
        "api::header.header.find",
        "api::fuente.fuente.find",
        "api::category.category.find",
        "api::featured-product.featured-product.find",
        "api::footer.footer.find",
        "api::hero.hero.find",
        "api::inicio-pagina.inicio-pagina.find",
        "api::newsletter.newsletter.find",
        "api::trust-banner.trust-banner.find",
        "api::product.product.find",
        "api::product.product.findOne",
        "api::product-tendencia.product-tendencia.find",
        "api::product-tendencia.product-tendencia.findOne",
      ];

      await Promise.all(
        permissions.map(async (action) => {
          const permission = await strapi
            .db.query("plugin::users-permissions.permission")
            .findOne({
              where: {
                action,
                role: publicRole.id,
              },
            });

          if (!permission) {
            await strapi.db.query("plugin::users-permissions.permission").create({
              data: {
                action,
                role: publicRole.id,
              },
            });
          }
        })
      );

      // Seed default Header if not exists
      const header = await strapi.db.query("api::header.header").findOne();
      if (!header) {
        await strapi.db.query("api::header.header").create({
          data: {
            logoText: "EvoHance",
            menuItems: [
              { label: "Plantillas dashboard", url: "#" },
              { label: "Plantillas Auth", url: "#" },
              { label: "Componentes de UI/UX", url: "#" },
              { label: "Libros de programacion", url: "#" },
              { label: "Guias de estudio", url: "#" },
              { label: "Controladores", url: "#" }
            ],
            publishedAt: new Date(), // Publish immediately
          },
        });
        console.log("Seeded default header data");
      } else if (!header.publishedAt) {
        // Force publish if exists but unpublished
        await strapi.db.query("api::header.header").update({
          where: { id: header.id },
          data: {
            publishedAt: new Date(),
          },
        });
        console.log("Force published header data");
      }

      // Seed default Fuente if not exists
      const fuente = await strapi.db.query("api::fuente.fuente").findOne();
      if (!fuente) {
        await strapi.db.query("api::fuente.fuente").create({
          data: {
            sans: "Inter",
            display: "Cinzel",
            publishedAt: new Date(), // Publish immediately
          },
        });
        console.log("Seeded default fuente data");
      } else if (!fuente.publishedAt) {
        // Force publish if exists but unpublished
        await strapi.db.query("api::fuente.fuente").update({
          where: { id: fuente.id },
          data: {
            publishedAt: new Date(),
          },
        });
        console.log("Force published fuente data");
      }

    } catch (error) {
      console.error("Bootstrap error:", error);
    }
  },
};

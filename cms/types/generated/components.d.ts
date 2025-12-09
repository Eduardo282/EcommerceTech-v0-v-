import type { Schema, Struct } from '@strapi/strapi';

export interface DestacadosSeccionProductos extends Struct.ComponentSchema {
  collectionName: 'components_destacados_seccion_productos';
  info: {
    displayName: 'Producto';
    icon: 'gift';
  };
  attributes: {
    inicio_pagina: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
  };
}

export interface TendenciasProducto extends Struct.ComponentSchema {
  collectionName: 'components_tendencias_productos';
  info: {
    displayName: 'Producto';
    icon: 'lock';
  };
  attributes: {
    inicio_pagina: Schema.Attribute.Relation<
      'oneToMany',
      'api::product-tendencia.product-tendencia'
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'destacados.seccion-productos': DestacadosSeccionProductos;
      'tendencias.producto': TendenciasProducto;
    }
  }
}

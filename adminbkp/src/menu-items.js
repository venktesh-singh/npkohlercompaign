const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/app/dashboard/default'
        }
      ]
    },
    {
      id: 'ui-forms',
      title: 'Eshop Pages',
      type: 'group',
      icon: 'icon-group',
      class: 'remove-secp',
      children: [
        {
          id: 'forms',
          title: 'Product',
          type: 'item',
          icon: 'feather icon-file-text',
          url: '/product/product-list'
        },
        {
          id: 'table',
          class: 'remove-secp',
          title: 'Product Detail',
          type: 'item',
          //icon: 'feather icon-file-text',
          url: '/product/product-detail'
        },
        {
          id: 'table',
          class: 'remove-secp',
          title: 'Add Product',
          type: 'item',
          //icon: 'feather icon-file-text',
          url: '/product/add'
        },
        {
          id: 'table',
          class: 'remove-secp',
          title: 'Update Product',
          type: 'item',
          //icon: 'feather icon-file-text',
          url: '/product/edit/:id'
        },
      ]
    },
    {
      //id: 'ui-forms',
      //title: 'Eshop Pages',
      type: 'group',
      icon: 'icon-group',
      class: 'remove-secp',
      children: [
        {
          id: 'forms',
          class: 'remove-secp',
          title: 'Category List',
          type: 'item',
          icon: 'feather icon-file-text',
          url: '/category/list'
        },
        {
          id: 'table',
          class: 'remove-secp',
          title: 'Category Detail',
          type: 'item',
          //icon: 'feather icon-file-text',
          url: '/category/detail'
        },
        {
          id: 'table',
          class: 'remove-secp',
          title: 'Category Add',
          type: 'item',
          //icon: 'feather icon-file-text',
          url: '/category/add'
        },
        {
          id: 'table',
          class: 'remove-secp',
          title: 'Category Update',
          type: 'item',
          //icon: 'feather icon-file-text',
          url: '/category/edit/:id'
        },
      ]
    },
    {
      //id: 'ui-forms',
      //title: 'Eshop Pages',
      type: 'group',
      icon: 'icon-group',
      class: 'remove-secp',
      children: [
        {
          id: 'forms',
          class: 'remove-secp',
          title: 'Subcategory List',
          type: 'item',
          icon: 'feather icon-file-text',
          url: '/subcategory/list'
        }
      ]
    },
    {
      //id: 'ui-forms',
      //title: 'Eshop Pages',
      type: 'group',
      icon: 'icon-group',
      class: 'remove-secp',
      children: [
        {
          id: 'forms',
          class: 'remove-secp',
          title: 'User List',
          type: 'item',
          icon: 'feather icon-file-text',
          url: '/user/list'
        }
      ]
    },
    {
      id: 'ui-element',
      title: 'UI ELEMENT',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'component',
          title: 'Form Query',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'button',
              title: 'Appointment Form',
              type: 'item',
              url: '/appointment/list'
            },
            {
              id: 'badges',
              title: 'Popup Form',
              type: 'item',
              url: '/popform/list'
            },
            {
              id: 'breadcrumb',
              title: 'Contact Form',
              type: 'item',
              url: '/contact/list'
            },
          ]
        }
      ]
    },
  ]
};

const urlsToRemove = [
  '/category/detail',
  '/category/add',
  '/category/edit/:id',
  '/subcategory/detail',
  '/subcategory/add',
  '/subcategory/edit/:id',
  '/product/product-detail',
  '/product/add',
  '/product/edit/:id',
  '/user/add',
  '/user/edit/:id',
  '/user/detail',
  '/appointment/detail',
  '/popform/detail',
];

// Filter out the specific items from all groups
menuItems.items = menuItems.items.map(group => {
  if (group.children) {
    group.children = group.children.filter(item => !urlsToRemove.includes(item.url));
  }
  return group;
});

//console.log(menuItems);

export default menuItems;

//  Inventory Page Model
import { Selector, t, ClientFunction } from 'testcafe';

class InventoryPage {
  constructor() {
    this.inventoryItemLabel = Selector('.inventory_item_label');
    this.inventoryItemImgs = Selector('img.inventory_item_img');
  }

  getAllInventoryImgs() {
    return this.inventoryItemImgs;
  }

  /**
   *
   * @param {Number} productId
   */
  async addProductToCart(productId) {
    await t.click(
      this.inventoryItemLabel
        .child(`#item_${productId}_title_link`)
        .parent()
        .sibling('.pricebar')
        .child('.btn_inventory')
    );
  }
}

export default new InventoryPage();

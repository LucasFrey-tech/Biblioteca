import { ShoppingCartService } from '../../src/modules/shopping_cart/shopping_cart.service';

jest.mock('@nestjs/common');

describe('ShoppingCartService', () => {
  let instance;

  beforeEach(() => {
    instance = new ShoppingCartService();
  });

  it('instance should be an instanceof ShoppingCartService', () => {
    expect(instance instanceof ShoppingCartService).toBeTruthy();
  });
});
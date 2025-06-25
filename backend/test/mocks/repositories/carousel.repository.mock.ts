import { Carousel } from "src/entidades/carousel.entity";

export const mockNewCarouselItem: Carousel = {
    id: 4,
    idBook: 1,
    image: ""
};

export const mockUpdatedCarouselItem = {
    idBook: 1,
    image: ""
};

export const mockCarouselItem1: Carousel = {
    id: 1,
    idBook: 1,
    image: ""
};

export const mockCarouselItem2: Carousel = {
    id: 2,
    idBook: 2,
    image: ""
};

export const mockCarouselItem3: Carousel = {
    id: 3,
    idBook: 3,
    image: ""
};

export const mockCarouselItems = [mockCarouselItem1, mockCarouselItem2, mockCarouselItem3];
export const mockDeletedCarouselItems = [mockCarouselItem1, mockCarouselItem2];

export const mockCarouselItemRepository = {
  find: jest.fn().mockResolvedValue(mockCarouselItems),
  findOne: jest.fn().mockResolvedValue(mockCarouselItem1),
  create: jest.fn().mockResolvedValue(mockNewCarouselItem),
  update: jest.fn().mockResolvedValue(mockUpdatedCarouselItem),
  delete: jest.fn().mockResolvedValue(mockDeletedCarouselItems),
  save: jest.fn().mockResolvedValue(mockNewCarouselItem),    
  remove: jest.fn().mockResolvedValue(mockCarouselItem1),    
};


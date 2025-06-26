import { CarouselDTO } from "../../../src/modules/recomendations/carousel/carousel.dto";

export const mockCarouselService = {
    findAll: jest.fn().mockResolvedValue([]),
    create: jest.fn().mockResolvedValue({} as CarouselDTO),
    update: jest.fn().mockResolvedValue({} as CarouselDTO),
    remove: jest.fn().mockResolvedValue(undefined),
    bookImageUrl: jest.fn().mockReturnValue('http://image.url/test.jpg'),
} as any;
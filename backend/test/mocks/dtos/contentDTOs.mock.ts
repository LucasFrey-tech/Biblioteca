import { BookContentDTO } from "../../../src/modules/books/content/dto/book_content.dto";


export const mockDtoContent1: BookContentDTO = {
    idBook: 1,
    content: "http://host/prefix/content_file_name.txt"
}
export const mockDtoContent2: BookContentDTO = {
    idBook: 1,
    content: "http://host/prefix/content_file_name2.txt"
}
export const mockDtoContent3: BookContentDTO = {
    idBook: 1,
    content: "http://host/prefix/content_file_name3.txt"
}
export const mockDtoContent4: BookContentDTO = {
    idBook: 1,
    content: "http://host/prefix/content_file_name4.txt"
}
export const mockDtoNewContent: BookContentDTO = {
    idBook: 4,
    content: "http://host/prefix/content_file_name4.txt"
}

export const mockDtoUpdatedContent1: BookContentDTO = {
    idBook: 1,
    content: "url",
};

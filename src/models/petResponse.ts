import Pet from "./pet.ts";

export interface Pagination {
  pageSize: number;
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export default interface PetResponse {
  pets: Pet[];
  pagination: Pagination;
}

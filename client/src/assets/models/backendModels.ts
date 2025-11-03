// Enums (deben coincidir con los de Prisma)
export type Role = 'USER' | 'ADMIN';
export type Modality = 'PRESENCIAL' | 'VIRTUAL' | 'HIBRIDA';
export type GalleryCategory = 'EVENTOS' | 'INSTALACIONES' | 'ESTUDIANTES';

// Utilidades de fechas (en API viajan como ISO strings)
export type ISODate = string;

// ===== Modelos =====
export interface News {
  id: number;
  title: string;
  resumen?: string;
  url: string; // slug generado en backend
  description: string;
  date: ISODate;
  image: string;
  category: string; // libre en Prisma
  createdAt: ISODate;
  updatedAt: ISODate;
}

export interface Event {
  id: number;
  title: string;
  url: string; // slug generado en backend
  resumen: string;
  description: string;
  date: ISODate;
  hour: string;
  endHour: string;
  audience: string;
  location: string; 
  topic: string;
  contact: string;
  modality: Modality;
  image: string;
  createdAt: ISODate;
  updatedAt: ISODate;
  urlForm?: string;
}

export interface Gallery {
  id: number;
  title: string;
  description: string;
  images: string; // JSON string array of base64 images
  url: string;
  category: 'EVENTOS' | 'INSTALACIONES' | 'ESTUDIANTES';
  createdAt: string;
  updatedAt: string;
}

export interface UserPublic {
  id: number;
  email: string;
  name: string;
  role: Role;
  createdAt: ISODate;
  updatedAt: ISODate;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  image?: string | null;
  createdAt: ISODate;
  updatedAt: ISODate;
}

export interface Setting {
  key: string;
  value: string;
}

// ===== DTOs (requests/responses) =====
// Auth
export interface AuthLoginRequest {
  email: string;
  password: string;
}
export interface AuthSignupRequest {
  email: string;
  password: string;
  name?: string;
  role?: Role; // normalmente lo asigna el backend
}
export interface AuthResponse {
  token: string;
  user: UserPublic;
}

// News
export interface CreateNewsRequest {
  title: string;
  resumen?: string;
  description: string;
  date?: ISODate; // opcional si el backend lo setea
  image: string;
  category: string;
}
export type UpdateNewsRequest = Partial<CreateNewsRequest>;

// Events
export interface CreateEventRequest {
  title: string;
  resumen?: string;
  description: string;
  date: ISODate;
  hour: string;
  endHour?: string;
  audience?: string;
  location?: string;
  topic?: string;
  contact?: string;
  modality: Modality;
  image: string;
  urlForm?: string;
}
export type UpdateEventRequest = Partial<CreateEventRequest>;

// Gallery
export interface CreateGalleryRequest {
  title: string;
  images: string;
  description?: string;
  category: 'EVENTOS' | 'INSTALACIONES' | 'ESTUDIANTES';
}
export type UpdateGalleryRequest = Partial<CreateGalleryRequest>;

// Posts
export interface CreatePostRequest {
  title: string;
  content: string;
  image?: string | null;
}
export type UpdatePostRequest = Partial<CreatePostRequest>;

// Settings
export interface UpsertSettingRequest {
  value: string;
}

// ===== Helpers opcionales =====
export type IdParam = number | string; // para rutas /:id
export type WithId<T> = T & { id: number };
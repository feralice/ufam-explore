export interface Notification {
  id: string;
  message: string;
  postagemId: string;
  usuario: {
    username: string;
  };
}

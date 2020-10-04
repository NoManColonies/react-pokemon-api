export default interface IAPIResponse extends Response {
  results?: [];
  previous?: string;
  next?: string;
}

import api from "../../axios/interceptors";
import {
  GetRoomMessagesRequest,
  GetRoomParticipantsRequest,
} from "../../models/rooms.model";

async function getRoomsApi() {
  const response = await api.get(import.meta.env.VITE_API_URL + "rooms/");
  return response;
}

async function getRoomMessagesApi(request: GetRoomMessagesRequest) {
  const response = await api.get(
    import.meta.env.VITE_API_URL + `rooms/messagesByRoom/${request.roomId}`,
  );
  return response;
}

async function getRoomParticipantsApi(request: GetRoomParticipantsRequest) {
  const response = await api.get(
    import.meta.env.VITE_API_URL + `rooms/${request.roomId}`,
  );
  return response;
}

export { getRoomsApi, getRoomMessagesApi, getRoomParticipantsApi };

import api from "../../axios/interceptors";
import {
  GetRoomMessagesRequest,
  GetRoomParticipantsRequest,
} from "../../models/rooms.model";

async function getRoomsApi() {
  const response = await api.get("rooms/");
  return response;
}

async function getRoomMessagesApi(request: GetRoomMessagesRequest) {
  const response = await api.get(`rooms/messagesByRoom/${request.roomId}`);
  return response;
}

async function getRoomParticipantsApi(request: GetRoomParticipantsRequest) {
  const response = await api.get(`rooms/${request.roomId}`);
  return response;
}

export { getRoomsApi, getRoomMessagesApi, getRoomParticipantsApi };

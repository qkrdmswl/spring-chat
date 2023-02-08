package springchat.domain.DTO;

import lombok.Builder;
import lombok.Getter;
import org.springframework.web.socket.WebSocketSession;
import springchat.service.ChatService;

import java.util.HashSet;
import java.util.Set;

@Getter
public class ChatRoomDTO {
    private String roomId;
    private String name;
    private Set<WebSocketSession> sessions = new HashSet<>();

    @Builder
    public ChatRoomDTO(String roomId, String name) {
        this.roomId = roomId;
        this.name = name;
    }


    // 이미 입장해 있는 사람이면?
    public void handlerActions(WebSocketSession session, ChatMessageDTO chatMessageDTO, ChatService chatService) {
        if (chatMessageDTO.getType().equals(ChatMessageDTO.MessageType.ENTER)) {
            sessions.add(session);
            chatMessageDTO.setMessage(chatMessageDTO.getSender()+ "님이 입장했어요. 손을 들어 환영해줍시다!");
        }
        sendMessage(chatMessageDTO, chatService);
    }

    private <T> void sendMessage(T message, ChatService chatService) {
        sessions.parallelStream()
                .forEach(session -> chatService.sendMessage(session, message));
    }
}

package springchat.lightChat;


import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import springchat.domain.DTO.ChatMessageDTO;
import springchat.domain.DTO.ChatRoomDTO;
import springchat.service.ChatService;

@Slf4j  // 로깅 라이브러리
@RequiredArgsConstructor
@Component
public class WebSocketHandler extends TextWebSocketHandler {
    private final ObjectMapper objectMapper;
    private final ChatService chatService;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        log.info("{}", payload);
        ChatMessageDTO chatMessage = objectMapper.readValue(payload, ChatMessageDTO.class);

        ChatRoomDTO chatRoom = chatService.findRoomById(chatMessage.getRoomId());
        chatRoom.handlerActions(session, chatMessage, chatService);
    }
}

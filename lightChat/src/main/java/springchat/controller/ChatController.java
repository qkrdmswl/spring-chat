package springchat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import springchat.domain.DTO.ChatRoomDTO;
import springchat.service.ChatService;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChatController {
    private final ChatService chatService;

    @PostMapping
    public ChatRoomDTO createRoom(@RequestBody String name) {
        return chatService.createRoom(name);
    }

    @GetMapping
    public List<ChatRoomDTO> findAllRooms() {
        return chatService.findAllRooms();
    }
}

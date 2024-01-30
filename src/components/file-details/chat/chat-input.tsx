import React, { useContext, useRef } from 'react';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { Send } from 'lucide-react';
import { ChatContext } from './chat-context';

interface ChatInputProps {
  disabled?: boolean;
}

const ChatInput = ({ disabled }: ChatInputProps) => {
  const { addMessage, handleInputChange, isLoading, message } =
    useContext(ChatContext);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div className="absolute bottom-0 left-0 w-full">
      <form className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex flex-col w-full flex-grow p-4">
            <div className="relative">
              <Textarea
                ref={textareaRef}
                placeholder="Enter your question..."
                disabled={disabled}
                autoFocus
                rows={1}
                maxRows={4}
                value={message}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    addMessage();
                    textareaRef.current?.focus();
                  }
                }}
                className="resize-none pr-12 text-base py-3.5 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch "
              />
              <Button
                aria-label="send message"
                size="icon"
                className="absolute bottom-1.5 right-[8px]"
                disabled={disabled || isLoading}
                onClick={(e) => {
                  e.preventDefault();
                  addMessage();
                  textareaRef.current?.focus();
                }}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;

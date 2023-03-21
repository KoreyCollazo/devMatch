import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Attachment,
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Thread,
  Window
} from 'stream-chat-react';

// we'll reuse `useClient` hook from the "Add a Channel List" example
// import { useClient } from './hooks/useClient';

import 'stream-chat-react/dist/css/v2/index.css';

const userToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoid2FuZGVyaW5nLW1vb24tMiIsImV4cCI6MTY3OTM4NDIxNH0.ss6EevdvM0faR0wrAhm7oRrkKSCPR9nowBMc7IG9zQ0';

const user = {
  id: 'wandering-moon-2',
  name: 'wandering',
  image: 'https://getstream.io/random_png/?id=wandering-moon-2&name=wandering'
};

const filters = { type: 'messaging', members: { $in: ['wandering-moon-2'] } };
const sort = { last_message_at: -1 };

const attachments = [
  {
    image: 'https://images-na.ssl-images-amazon.com/images/I/71k0cry-ceL._SL1500_.jpg',
    name: 'iPhone',
    type: 'product',
    url: 'https://goo.gl/ppFmcR'
  }
];

const CustomAttachment = (props) => {
  const { attachments } = props;
  const [attachment] = attachments || [];

  if (attachment?.type === 'product')
    return (
      <div>
        Product:
        <a href={attachment.url} rel="noreferrer">
          <img alt="custom-attachment" height="100px" src={attachment.image} />
          <br />
          {attachment.name}
        </a>
      </div>
    );

  return <Attachment {...props} />;
};
const useClient = ({ apiKey, userData, tokenOrProvider }) => {
  const [chatClient, setChatClient] = useState(null);

  useEffect(() => {
    const client = new StreamChat(apiKey);
    // prevents application from setting stale client (user changed, for example)
    let didUserConnectInterrupt = false;

    const connectionPromise = client.connectUser(userData, tokenOrProvider).then(() => {
      if (!didUserConnectInterrupt) setChatClient(client);
    });

    return () => {
      didUserConnectInterrupt = true;
      setChatClient(null);
      // wait for connection to finish before initiating closing sequence
      connectionPromise
        .then(() => client.disconnectUser())
        .then(() => {
          console.log('connection closed');
        });
    };
  }, [apiKey, userData.id, tokenOrProvider]);

  return chatClient;
};

const App = () => {
  const chatClient = useClient({
    apiKey: 'dz5f4d5kzrue',
    userData: user,
    tokenOrProvider: userToken
  });

  useEffect(() => {
    if (!chatClient) return;

    const initAttachmentMessage = async () => {
      const [channelResponse] = await chatClient.queryChannels(filters, sort);

      await channelResponse.sendMessage({
        text: 'Your selected product is out of stock, would you like to select one of these alternatives?',
        attachments
      });
    };

    initAttachmentMessage();
  }, [chatClient]);

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  return (
    <Chat client={chatClient} theme="messaging light">
      <ChannelList filters={filters} sort={sort} />
      <Channel Attachment={CustomAttachment}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default App;

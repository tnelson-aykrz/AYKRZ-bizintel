(function(){
  const storageKey = 'aykrzChatbotResponses';
  const steps = [
    { id: 'trade', prompt: "Hi! What trade are you in?" },
    { id: 'city', prompt: "What city are you in?" },
    { id: 'current', prompt: "How are you currently finding new clients?" },
    { id: 'impact', prompt: "What would 20 new qualified leads per month do for your business?" },
    { id: 'name', prompt: "Before we wrap up, may I get your name?" },
    { id: 'email', prompt: "And your email?" }
  ];
  let stepIndex = 0;

  const createStyles = () => {
    const css = `
      .aykrz-chat-button {
        position: fixed;
        right: 20px;
        bottom: 24px;
        background: #2e7d32;
        color: #fff;
        border: none;
        border-radius: 50px;
        padding: 14px 18px;
        font-size: 16px;
        cursor: pointer;
        box-shadow: 0 6px 18px rgba(0,0,0,0.25);
        z-index: 2147483647;
      }
      .aykrz-chat-panel {
        position: fixed;
        right: 20px;
        bottom: 90px;
        width: min(360px, calc(100vw - 40px));
        max-height: 560px;
        display: flex;
        flex-direction: column;
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 12px 30px rgba(0,0,0,0.3);
        overflow: hidden;
        z-index: 2147483646;
        font-family: 'Segoe UI', system-ui, sans-serif;
      }
      .aykrz-chat-header {
        background: #2e7d32;
        color: #fff;
        padding: 12px 16px;
        font-weight: 600;
        font-size: 16px;
      }
      .aykrz-chat-body {
        padding: 16px;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
        overflow-y: auto;
      }
      .aykrz-chat-footer {
        border-top: 1px solid #e1e1e1;
        padding: 12px 16px;
        background: #f9f9f9;
        display: flex;
        gap: 8px;
      }
      .aykrz-chat-input {
        flex: 1;
        border: 1px solid #ddd;
        border-radius: 999px;
        padding: 10px 16px;
        font-size: 14px;
      }
      .aykrz-chat-send {
        background: #2e7d32;
        border: none;
        color: #fff;
        border-radius: 999px;
        padding: 0 18px;
        cursor: pointer;
        font-size: 14px;
      }
      .aykrz-bubble {
        max-width: 100%;
        padding: 10px 14px;
        border-radius: 14px;
        font-size: 14px;
      }
      .aykrz-bubble.user {
        background: #e0f7e9;
        align-self: flex-end;
        border-bottom-right-radius: 4px;
      }
      .aykrz-bubble.bot {
        background: #f2f2f2;
        align-self: flex-start;
        border-bottom-left-radius: 4px;
      }
      .aykrz-final-step {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 10px;
      }
      .aykrz-final-actions {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .aykrz-final-actions a {
        text-decoration: none;
        background: #2e7d32;
        color: #fff;
        text-align: center;
        padding: 10px;
        border-radius: 8px;
        font-weight: 600;
      }
      .aykrz-final-actions a.secondary {
        background: #fff;
        color: #2e7d32;
        border: 1px solid #2e7d32;
      }
    `;
    const styleTag = document.createElement('style');
    styleTag.textContent = css;
    document.head.appendChild(styleTag);
  };

  const saveResponse = (key, value) => {
    const payload = JSON.parse(localStorage.getItem(storageKey) || '{}');
    payload[key] = value;
    localStorage.setItem(storageKey, JSON.stringify(payload));
  };

  const addBubble = (message, type = 'bot') => {
    const bubble = document.createElement('div');
    bubble.className = `aykrz-bubble ${type}`;
    bubble.textContent = message;
    body.appendChild(bubble);
    body.scrollTop = body.scrollHeight;
  };

  const showFinalOptions = () => {
    addBubble('Great. Here are two ways to get started:');
    footer.style.display = 'none';
    const finalContainer = document.createElement('div');
    finalContainer.className = 'aykrz-final-step';

    const actions = document.createElement('div');
    actions.className = 'aykrz-final-actions';

    const primary = document.createElement('a');
    primary.href = 'https://buy.stripe.com/bJebIUf8h5kN0b4f2v1kA00';
    primary.target = '_blank';
    primary.textContent = 'Start with Starter ($297/mo)';

    const secondary = document.createElement('a');
    secondary.href = 'mailto:tnelson@aykrzlandscaping.com';
    secondary.textContent = 'Talk to Terrance first';
    secondary.className = 'secondary';

    actions.appendChild(primary);
    actions.appendChild(secondary);
    finalContainer.appendChild(actions);
    body.appendChild(finalContainer);
    body.scrollTop = body.scrollHeight;
  };

  const handleAnswer = () => {
    const value = input.value.trim();
    if (!value) {
      return;
    }
    const currentStep = steps[stepIndex];
    addBubble(value, 'user');
    saveResponse(currentStep.id, value);
    stepIndex += 1;
    input.value = '';

    if (stepIndex >= steps.length) {
      showFinalOptions();
      return;
    }

    const nextStep = steps[stepIndex];
    setTimeout(() => addBubble(nextStep.prompt, 'bot'), 250);
  };

  createStyles();

  const chatButton = document.createElement('button');
  chatButton.className = 'aykrz-chat-button';
  chatButton.textContent = 'Chat with AYKRZ';
  document.body.appendChild(chatButton);

  const panel = document.createElement('div');
  panel.className = 'aykrz-chat-panel';
  panel.style.display = 'none';

  const header = document.createElement('div');
  header.className = 'aykrz-chat-header';
  header.textContent = 'AYKRZ Business Intelligence';

  const body = document.createElement('div');
  body.className = 'aykrz-chat-body';

  const footer = document.createElement('div');
  footer.className = 'aykrz-chat-footer';

  const input = document.createElement('input');
  input.className = 'aykrz-chat-input';
  input.placeholder = 'Type your reply...';
  input.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      handleAnswer();
    }
  });

  const send = document.createElement('button');
  send.className = 'aykrz-chat-send';
  send.textContent = 'Send';
  send.addEventListener('click', handleAnswer);

  footer.appendChild(input);
  footer.appendChild(send);
  panel.appendChild(header);
  panel.appendChild(body);
  panel.appendChild(footer);
  document.body.appendChild(panel);

  chatButton.addEventListener('click', () => {
    const isOpen = panel.style.display === 'flex';
    if (isOpen) {
      panel.style.display = 'none';
      return;
    }
    panel.style.display = 'flex';
    panel.style.flexDirection = 'column';
    panel.style.height = 'min(560px, calc(100vh - 120px))';
    if (body.children.length === 0) {
      setTimeout(() => addBubble(steps[stepIndex].prompt, 'bot'), 250);
    }
  });
})();

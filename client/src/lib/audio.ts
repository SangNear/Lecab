import elevenlabs from '@/lib/eleven';
export const speakWord = (text: any) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9; // Phát âm tốc độ chuẩn học thuật dịu dàng
    window.speechSynthesis.speak(utterance);
  }
};

export const playFeedbackSound = (correct: boolean) => {
  const ctx = new AudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  if (correct) {
    // Âm thanh đúng: hai nốt đi lên
    oscillator.frequency.setValueAtTime(523, ctx.currentTime);       // C5
    oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.15); // E5
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.4);
  } else {
    // Âm thanh sai: một nốt thấp đi xuống
    oscillator.frequency.setValueAtTime(300, ctx.currentTime);
    oscillator.frequency.setValueAtTime(200, ctx.currentTime + 0.15);
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.4);
  }
};

const getUSVoice = () => {
  const voices = speechSynthesis.getVoices();

  return (
    voices.find((v) =>
      v.name.includes("Microsoft Aria")
    ) ||
    voices.find((v) =>
      v.name.includes("Microsoft Jenny")
    ) ||
    voices.find((v) =>
      v.name.includes("Google US English")
    ) ||
    voices.find((v) =>
      v.lang === "en-US"
    ) ||
    voices.find((v) =>
      v.lang.startsWith("en")
    ) ||
    null
  );
};
type Accent = "us" | "uk";

export const speak = (text: string, accent: Accent) => {
  if (!("speechSynthesis" in window)) return;

  speechSynthesis.cancel();

  const voices = speechSynthesis.getVoices();

  const voice =
    accent === "us"
      ? (
        voices.find((v) => v.name.includes("Microsoft Jenny")) ||
        voices.find((v) => v.name.includes("Microsoft Aria")) ||
        voices.find((v) => v.name.includes("Google US English")) ||
        voices.find((v) => v.lang === "en-US")
      )
      : (
        voices.find((v) => v.name.includes("Microsoft Ryan")) ||
        voices.find((v) => v.name.includes("Microsoft Sonia")) ||
        voices.find((v) => v.name.includes("Google UK English")) ||
        voices.find((v) => v.lang === "en-GB")
      );

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = accent === "uk" ? "en-GB" : "en-US";
  utterance.rate = 0.9;
  utterance.pitch = 1;

  if (voice) {
    utterance.voice = voice;
  }

  speechSynthesis.speak(utterance);
};


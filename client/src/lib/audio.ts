import elevenlabs from '@/lib/eleven';
export const playTextAudio = async (text: string) => {
    if (!text) return;
  
    try {
      const audio = await elevenlabs.textToSpeech.convert('JBFqnCBsd6RMkjVDRZzb', {
        text,
        modelId: "eleven_multilingual_v2",
      });
  
      const chunks: Uint8Array[] = [];
      const reader = audio.getReader();
  
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }
  
      const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
      const audioData = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        audioData.set(chunk, offset);
        offset += chunk.length;
      }
  
      const audioContext = new AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(audioData.buffer);
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start(0);
  
    } catch (error) {
      console.error("Audio error:", error);
    }
};
import { exec } from 'child_process';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Command to run the FFmpeg streaming
    const ffmpegCommand = '/usr/bin/ffmpeg -hide_banner -loglevel info -re -reconnect 1 -reconnect_at_eof 1 -reconnect_streamed 1 -reconnect_delay_max 5 -i http://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8 -c:v copy -c:a aac -b:a 128k -ar 44100 -f flv rtmp://74.208.198.159/live/demoax';
    
    // Execute the command using child_process
    exec(ffmpegCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).json({ error: 'Failed to start streaming' });
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return res.status(500).json({ error: 'Streaming failed' });
      }
      
      // If everything works, return success
      res.status(200).json({ message: 'Streaming started successfully', stdout });
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
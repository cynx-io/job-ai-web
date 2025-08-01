import { createClient } from "@connectrpc/connect";
import { transport } from "@/lib/janus/client/transport";
import { ResumeService } from "@/proto/janus/philyra/resume_pb";

export const resumeClient = createClient(ResumeService, transport);

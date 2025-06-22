import { Request, Response } from 'express';
import { CreateParticipantRequestDto, ParticipantCreateSchema, participantsTable } from './participants.model';
import { HTTP_STATUS } from '../../constants/status-codes';
import { getParticipantRow } from './participant.utils';


export const createParticipant = async (request: Request<{}, {}, CreateParticipantRequestDto>, response: Response) => {
  const parseResult = ParticipantCreateSchema.safeParse(request.body);

  if (!parseResult.success) {
    return response.status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: 'Invalid input', error: parseResult.error });
  }

  const createParticipantRequest = parseResult.data;
  const participantRow = getParticipantRow(createParticipantRequest);

  await participantsTable().insert(participantRow);

  return response.status(201).json({
    id: participantRow.id,
  });
};

import { Request, Response } from 'express';
import { CreateParticipantRequestDto, ParticipantCreateSchema } from '@gd/types/src/models/participants.model';
import { HTTP_STATUS } from '../../constants/status-codes';
import { getParticipantRow } from './participant.utils';
import { participantsTable } from './participants.db';

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

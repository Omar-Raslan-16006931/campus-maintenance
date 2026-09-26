import { model } from 'mongoose';
import {
  MaintenanceRequest,
  MaintenanceRequestSchema,
} from './maintenance-request.schema';

const RequestModel = model(MaintenanceRequest.name, MaintenanceRequestSchema);

const valid = {
  title: 'Broken projector',
  description: 'Projector in C3.201 does not turn on',
  location: 'Building C, room 3.201',
  category: 'equipment',
};

describe('MaintenanceRequestSchema', () => {
  it('defaults status to open', async () => {
    const doc = new RequestModel(valid);
    expect(doc.status).toBe('open');
    await expect(doc.validate()).resolves.toBeUndefined();
  });

  it('enables timestamps', () => {
    expect(MaintenanceRequestSchema.get('timestamps')).toBe(true);
  });

  it.each(['title', 'description', 'location', 'category'])(
    'requires %s',
    async (field) => {
      const doc = new RequestModel({ ...valid, [field]: undefined });
      await expect(doc.validate()).rejects.toHaveProperty(`errors.${field}`);
    },
  );

  it('rejects unsupported categories', async () => {
    const doc = new RequestModel({ ...valid, category: 'spaceship' });
    await expect(doc.validate()).rejects.toHaveProperty('errors.category');
  });

  it('rejects unsupported statuses', async () => {
    const doc = new RequestModel({ ...valid, status: 'deleted' });
    await expect(doc.validate()).rejects.toHaveProperty('errors.status');
  });

  it('does not add a version key', () => {
    expect(MaintenanceRequestSchema.get('versionKey')).toBe(false);
  });
});

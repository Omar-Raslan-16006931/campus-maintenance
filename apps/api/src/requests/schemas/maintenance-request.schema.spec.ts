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
  it('defaults status to open', () => {
    const doc = new RequestModel(valid);
    expect(doc.status).toBe('open');
    expect(doc.validateSync()).toBeUndefined();
  });

  it('enables timestamps', () => {
    expect(MaintenanceRequestSchema.get('timestamps')).toBe(true);
  });

  it.each(['title', 'description', 'location', 'category'])(
    'requires %s',
    (field) => {
      const doc = new RequestModel({ ...valid, [field]: undefined });
      expect(doc.validateSync()?.errors[field]).toBeDefined();
    },
  );

  it('rejects unsupported categories', () => {
    const doc = new RequestModel({ ...valid, category: 'spaceship' });
    expect(doc.validateSync()?.errors.category).toBeDefined();
  });

  it('rejects unsupported statuses', () => {
    const doc = new RequestModel({ ...valid, status: 'deleted' });
    expect(doc.validateSync()?.errors.status).toBeDefined();
  });
});

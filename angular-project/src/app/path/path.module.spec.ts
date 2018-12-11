import { PathModule } from './path.module';

describe('PathModule', () => {
  let pathModule: PathModule;

  beforeEach(() => {
    pathModule = new PathModule();
  });

  it('should create an instance', () => {
    expect(pathModule).toBeTruthy();
  });
});

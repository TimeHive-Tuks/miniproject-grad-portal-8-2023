export class ProfileLikedPostUpdatedEvent {
  constructor(
    public readonly profile: string,
    public readonly post: string,
    public readonly remove: boolean
  ) {}
}

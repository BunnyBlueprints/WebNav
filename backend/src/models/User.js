import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      default: null,
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
      trim: true,
      maxlength: 280,
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    providers: {
      googleId: {
        type: String,
        default: null,
      },
      githubId: {
        type: String,
        default: null,
      },
    },
    activeSessions: [
      {
        sessionId: {
          type: String,
          required: true,
        },
        userAgent: {
          type: String,
          default: 'Unknown device',
        },
        ipAddress: {
          type: String,
          default: '',
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        lastSeenAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toSafeObject = function toSafeObject() {
  return {
    id: this._id.toString(),
    name: this.name,
    email: this.email,
    avatarUrl: this.avatarUrl,
    bio: this.bio,
    twoFactorEnabled: this.twoFactorEnabled,
    providers: {
      google: Boolean(this.providers?.googleId),
      github: Boolean(this.providers?.githubId),
      password: Boolean(this.passwordHash),
    },
    activeSessions: (this.activeSessions || []).map((session) => ({
      id: session.sessionId,
      userAgent: session.userAgent,
      ipAddress: session.ipAddress,
      createdAt: session.createdAt,
      lastSeenAt: session.lastSeenAt,
    })),
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

export const User = mongoose.model('User', userSchema);

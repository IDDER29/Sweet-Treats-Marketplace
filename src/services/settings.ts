"use server";

// Business settings service.
//
// Assumed REST contract (adjust to the real backend when its spec is known):
//   GET /business/settings -> BusinessSettings
//   PUT /business/settings -> BusinessSettings (accepts a partial update)
//
// NOTE: a "use server" module may only export async functions, so the
// settings types + default constants live in `@/lib/settings`.

import { getServerApi } from "@/lib/api-client";
import {
  EMPTY_NOTIFICATIONS,
  EMPTY_SETTINGS,
  type BusinessSettings,
  type UpdateBusinessSettingsInput,
} from "@/lib/settings";

export async function getBusinessSettings(): Promise<BusinessSettings> {
  const api = await getServerApi();
  // Assumed contract: GET /business/settings -> Partial<BusinessSettings>
  const { data } = await api.get<Partial<BusinessSettings>>(
    "/business/settings"
  );
  return {
    ...EMPTY_SETTINGS,
    ...data,
    notifications: { ...EMPTY_NOTIFICATIONS, ...data?.notifications },
  };
}

export async function updateBusinessSettings(
  input: UpdateBusinessSettingsInput
): Promise<BusinessSettings> {
  const api = await getServerApi();
  // Assumed contract: PUT /business/settings accepts a partial update and
  // returns the full, updated settings object.
  const { data } = await api.put<Partial<BusinessSettings>>(
    "/business/settings",
    input
  );
  return {
    ...EMPTY_SETTINGS,
    ...data,
    notifications: { ...EMPTY_NOTIFICATIONS, ...data?.notifications },
  };
}

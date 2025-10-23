export type Service = {
  id: string;
  type: string;
  sortOrder: number;
  name: string;
  description: string;
  tagLine: string;
  defaultCapacity: number;
  media: {
    items: {
      type: string;
      url: string;
      mimeType: string;
      size: number;
      width: number;
      height: number;
      createdDate: string;
      updatedDate: string;
      tags: string[];
      isDeleted: boolean;
    }[];
    mainMedia: {
      image: {
        id: string;
        url: string;
        height: number;
        width: number;
        filename: string;
      };
    };
  };

  hidden: boolean;
  category: {
    id: string;
    name: string;
    sortOrder: number;
  };
  form: {
    id: string;
  };
  locations: {
    id: string;
    type: string;
    calculatedAddress: {
      formattedAddress: string;
    };
    business: {
      id: string;
      name: string;
      default: boolean;
      address: {
        formattedAddress: string;
      };
      email: string;
      phone: string;
    };
  }[];
  payment: {
    rateType: string;
    fixed: {
      price: {
        value: string;
        currency: string;
      };
    };
    options: {
      online: boolean;
    };
    pricingPlanIds: [];
    addOnOption: string;
  };
  onlineBooking: {
    enabled: boolean;
  };
  conferencing: {
    enabled: boolean;
  };
  bookingPolicy: {
    id: string;
    revision: string;
    createdDate: string;
    updatedDate: string;
    name: string;
    customPolicyDescription: {
      enabled: boolean;
      description: string;
    };
    default: boolean;
    limitEarlyBookingPolicy: {
      enabled: boolean;
      earliestBookingInMinutes: number;
    };
    limitLateBookingPolicy: {
      enabled: boolean;
      latestBookingInMinutes: number;
    };
    bookAfterStartPolicy: {
      enabled: boolean;
    };
    cancellationPolicy: {
      enabled: boolean;
      limitLatestCancellation: boolean;
      latestCancellationInMinutes: number;
      reschedulePolicy: {
        enabled: boolean;
        limitLatestReschedule: boolean;
        latestRescheduleInMinutes: number;
      };
      waitlistPolicy: {
        enabled: boolean;
        capacity: number;
        reservationTimeInMinutes: number;
      };
      participantsPolicy: {
        enabled: boolean;
        maxParticipantsPerBooking: number;
      };
      resourcesPolicy: {
        enabled: boolean;
        autoAssignAllowed: boolean;
      };
      cancellationFeePolicy: {
        enabled: boolean;
        cancellationWindows: [];
        autoCollectFeeEnabled: boolean;
      };
      saveCreditCardPolicy: {
        enabled: boolean;
      };
      staffSortingPolicy: {
        sortingMethodType: string;
      };
    };
  };
  schedule: {
    id: string;
    availabilityConstraints: {
      durations: [
        {
          minutes: number;
        }
      ];
      sessionDurations: [number];
      timeBetweenSessions: number;
    };
  };
  staffMemberIds: [string];
  staffMembers: [];
  resourceGroups: [];
  serviceResources: [];
  supportedSlugs: [
    {
      name: string;
      custom: boolean;
      createdDate: string;
    }
  ];
  mainSlug: {
    name: string;
    custom: boolean;
    createdDate: string;
  };
  urls: {
    servicePage: {
      relativePath: string;
      url: string;
    };
    calendarPage: {
      relativePath: string;
      url: string;
    };
  };
  createdDate: string;
  updatedDate: string;
  revision: string;
  addOnGroups: [];
  addOnDetails: [];
};

export type QueryServicesResponse = {
  services: Service[];
  pagingMetadata: PagingMetadata;
};

export type PagingMetadata = {
  count: number;
  cursors: {
    after: string;
    before: string;
  };
  hasNext: boolean;
};

export type BookingResponse = {
  booking: {
    id: string;
    bookedEntity: {
      slot: {
        serviceId: string;
        scheduleId: string;
        startDate: string;
        endDate: string;
        timezone: string;
        resource: {
          id: string;
          name: string;
          scheduleId: string;
        };
        location: {
          id: string;
          name: string;
          formattedAddress: string;
          locationType: string;
        };
      };
      title: string;
      tags: string[];
    };
    contactDetails: {
      firstName: string;
      email: string;
    };
    additionalFields: [];
    totalParticipants: number;
    status: string;
    paymentStatus: string;
    selectedPaymentOption: string;
    createdDate: string;
    revision: string;
    createdBy: {
      identityType: string;
      wixUserId: string;
    };
    startDate: string;
    endDate: string;
    updatedDate: string;
  };
};

export type StaffMember = {
  id: string;
  name: string;
  email?: string;
  mainMedia: {
    image: {
      id: string;
      url: string;
      height: number;
      width: number;
      filename: string;
      sizeInBytes: string;
    };
  };
  resourceId: string;
  associatedWixIdentity?: {
    identificationData: {
      contactId: string;
      identityType: string;
      wixUserId: string;
    };
    connectionStatus: string;
  };
  default: boolean;
  revision: string;
  createdDate: string;
  updatedDate: string;
};

export type QueryStaffMembersResponse = {
  staffMembers: StaffMember[];
  pagingMetadata: {
    count: number;
    cursors: {};
    hasNext: boolean;
  };
};

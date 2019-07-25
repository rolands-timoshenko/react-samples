export const artificialRoot = type => {
  return {
    trunk: {
      items: [
        {
          turbot: {
            id: "turbotArtificialRoot",
            path: "turbotArtificialRoot",
            title: `All ${type.titlePlural}`
          }
        }
      ]
    },
    icon: "fal-cube",
    turbot: {
      id: "turbotArtificialRoot",
      path: "turbotArtificialRoot",
      title: `All ${type.titlePlural}`
    }
  };
};

export const insufficientPermissions = () => {
  return {
    trunk: {
      items: [
        {
          turbot: {
            id: "insufficientPermissions",
            path: "insufficientPermissions",
            title: "Insufficient Permissions"
          }
        }
      ]
    },
    icon: "fas-skull-crossbones",
    turbot: {
      id: "insufficientPermissions",
      path: "insufficientPermissions",
      title: `Insufficient Permissions`
    }
  };
};

const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const FavTypes = require('../types')

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    public_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    refresh_token: {
      type: DataTypes.STRING(1000)
    },
    access_token: {
      type: DataTypes.STRING(1000)
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isBanned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isOauthProfile: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  { timestamps: false }
)

const UserFavorite = sequelize.define(
  'userfavorite',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    favoritable_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    favoritable_type: {
      type: DataTypes.ENUM(...Object.values(FavTypes)),
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'id'
      }
    }
  },
  { timestamps: false }
)

const UserProfile = sequelize.define(
  'userprofile',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'id'
      }
    },
    fio: {
      type: DataTypes.STRING(100)
    },
    phone: {
      type: DataTypes.STRING(30)
    },
    registration_date: {
      type: DataTypes.DATE
    },
    photo: {
      type: DataTypes.STRING
    }
  },
  { timestamps: false }
)

const UserReportType = sequelize.define(
  'userreporttype',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  },
  { timestamps: false }
)

const UserReport = sequelize.define(
  'userreport',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    public_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'id'
      }
    },
    reporter_id: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'id'
      }
    },
    report_text: {
      type: DataTypes.STRING(500)
    },
    report_type_id: {
      type: DataTypes.STRING,
      references: {
        model: UserReportType,
        key: 'id'
      }
    },
    report_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  { timestamps: false }
)

const Category = sequelize.define(
  'category',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  },
  { timestamps: false }
)

const Collection = sequelize.define(
  'collection',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    public_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    owner_id: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    category_id: {
      type: DataTypes.STRING,
      references: {
        model: Category,
        key: 'id'
      }
    },
    views_count: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  },
  { timestamps: false }
)

const Item = sequelize.define(
  'item',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    public_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    item_description: {
      type: DataTypes.STRING
    },
    owner_id: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'id'
      }
    },
    photo: {
      type: DataTypes.STRING
    }
  },
  { timestamps: false, onDelete: 'CASCADE' }
)

const CollectionItem = sequelize.define(
  'collectionitem',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    collection_id: {
      type: DataTypes.STRING,
      references: {
        model: Collection,
        key: 'id',
        onDelete: 'CASCADE'
      }
    },
    item_id: {
      type: DataTypes.STRING,
      references: {
        model: Item,
        key: 'id'
      }
    }
  },
  { timestamps: false }
)

const CollectionRating = sequelize.define(
  'collectionrating',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    collection_id: {
      type: DataTypes.STRING,
      references: {
        model: Collection,
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'id'
      }
    },
    rate_text: {
      type: DataTypes.STRING
    },
    rate: {
      type: DataTypes.SMALLINT
    }
  },
  { timestamps: false }
)

const ItemRequest = sequelize.define(
  'itemrequest',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    public_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    item_title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    request_description: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'id'
      }
    },
    request_photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    category_id: {
      type: DataTypes.STRING,
      references: {
        model: Category,
        key: 'id'
      }
    }
  },
  { timestamps: false }
)

const ItemAdvertisement = sequelize.define(
  'itemadvertisement',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    public_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    item_id: {
      type: DataTypes.STRING,
      references: {
        model: Item,
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'id'
      }
    },
    advertisement_description: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    category_id: {
      type: DataTypes.STRING,
      references: {
        model: Category,
        key: 'id'
      }
    }
  },
  { timestamps: false }
)

const UsersExchange = sequelize.define('usersexchange', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  public_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  exch_item_id: {
    type: DataTypes.STRING,
    references: {
      model: Item,
      key: 'id'
    }
  },
  proposal_item_id: {
    type: DataTypes.STRING,
    references: {
      model: Item,
      key: 'id'
    }
  },
  submitted_by_owner: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  submitted_by_user: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  owner_id: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'id'
    }
  }
})

UsersExchange.belongsTo(Item, {
  foreignKey: 'exch_item_id',
  as: 'exchangeItem',
  onDelete: 'CASCADE'
})

// Association with Item model for proposal_item_id
UsersExchange.belongsTo(Item, {
  foreignKey: 'proposal_item_id',
  as: 'proposalItem',
  onDelete: 'CASCADE'
})

// Association with User model for owner_id
UsersExchange.belongsTo(User, {
  foreignKey: 'owner_id',
  as: 'owner'
})

// User associations
User.hasOne(UserProfile, { foreignKey: 'user_id' })
User.hasMany(UserFavorite, { foreignKey: 'user_id' })
User.hasMany(UserReport, { foreignKey: 'user_id' })
User.hasMany(UserReport, { foreignKey: 'reporter_id' })
User.hasMany(Collection, { foreignKey: 'owner_id', onDelete: 'CASCADE' })
User.hasMany(CollectionRating, { foreignKey: 'user_id' })
User.hasMany(Item, { foreignKey: 'owner_id', onDelete: 'CASCADE' })
User.hasMany(ItemAdvertisement, { foreignKey: 'user_id', onDelete: 'CASCADE' })
User.hasMany(ItemRequest, { foreignKey: 'user_id', onDelete: 'CASCADE' })

// UserProfile association
UserProfile.belongsTo(User, { foreignKey: 'user_id' })

// UserFavorite association (polymorphic)
UserFavorite.belongsTo(User, { foreignKey: 'user_id' })

// UserReport associations
UserReport.belongsTo(User, { foreignKey: 'user_id', as: 'reportedUser' })
UserReport.belongsTo(User, { foreignKey: 'reporter_id', as: 'reporter' })
UserReport.belongsTo(UserReportType, { foreignKey: 'report_type_id' })

// Collection associations
Collection.belongsTo(User, { foreignKey: 'owner_id' })
Collection.belongsTo(Category, { foreignKey: 'category_id' })
Collection.hasMany(CollectionItem, {
  foreignKey: 'collection_id',
  onDelete: 'CASCADE'
})
Collection.hasMany(CollectionRating, { foreignKey: 'collection_id' })

// Category associations
Category.hasMany(Collection, { foreignKey: 'category_id' })
Category.hasMany(ItemRequest, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
})
Category.hasMany(ItemAdvertisement, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
})

// CollectionRating associations
CollectionRating.belongsTo(Collection, {
  foreignKey: 'collection_id',
  onDelete: 'CASCADE'
})
CollectionRating.belongsTo(User, { foreignKey: 'user_id' })

// Item associations
Item.belongsTo(User, { foreignKey: 'owner_id', onDelete: 'CASCADE' })
Item.hasMany(CollectionItem, { foreignKey: 'item_id', onDelete: 'CASCADE' })

// CollectionItem associations
CollectionItem.belongsTo(Collection, { foreignKey: 'collection_id' })
CollectionItem.belongsTo(Item, { foreignKey: 'item_id', onDelete: 'CASCADE' })

// ItemRequest associations
ItemRequest.belongsTo(Category, { foreignKey: 'category_id' })
ItemRequest.belongsTo(User, { foreignKey: 'user_id' })

// ItemAdvertisement associations
ItemAdvertisement.belongsTo(Item, {
  foreignKey: 'item_id',
  onDelete: 'CASCADE'
})
ItemAdvertisement.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})
ItemAdvertisement.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
})

module.exports = {
  User,
  UserFavorite,
  UserProfile,
  UserReport,
  UserReportType,
  Category,
  Collection,
  CollectionItem,
  CollectionRating,
  Item,
  ItemAdvertisement,
  ItemRequest,
  UsersExchange,
  sequelize
}

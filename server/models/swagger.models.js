/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: User ID (UUID)
 *         public_id:
 *           type: integer
 *           description: Public ID for the user
 *         login:
 *           type: string
 *           description: User login name
 *         password:
 *           type: string
 *           description: User password (hashed)
 *         email:
 *           type: string
 *           description: User email address
 *         role:
 *           type: integer
 *           description: User role (0 - admin, 1 - user, etc.)
 *         refresh_token:
 *           type: string
 *           description: Refresh token for the user
 *         access_token:
 *           type: string
 *           description: Access token for the user
 *         isApproved:
 *           type: boolean
 *           description: Whether the user is approved or not
 *           default: false
 *         isBanned:
 *           type: boolean
 *           description: Whether the user is banned or not
 *           default: false
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserFavorite:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: UserFavorite ID (UUID)
 *         favoritable_id:
 *           type: string
 *           description: Favoritable ID
 *         favoritable_type:
 *           type: string
 *           enum:
 *             - item
 *             - collection
 *           description: Type of the favoritable (item or collection)
 *         user_id:
 *           type: string
 *           description: ID of the user who favorited
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: UserProfile ID (UUID)
 *         user_id:
 *           type: string
 *           description: User ID (UUID)
 *         fio:
 *           type: string
 *           description: Full name of the user
 *         phone:
 *           type: string
 *           description: Phone number of the user
 *         registration_date:
 *           type: string
 *           format: date-time
 *           description: Registration date of the user
 *         photo:
 *           type: string
 *           description: URL of the user's photo
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserReportType:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: UserReportType ID (UUID)
 *         title:
 *           type: string
 *           description: Title of the report type
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserReport:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: UserReport ID (UUID)
 *         public_id:
 *           type: integer
 *           description: Public ID for the report
 *         user_id:
 *           type: string
 *           description: User ID (UUID)
 *         reporter_id:
 *           type: string
 *           description: Reporter ID (UUID)
 *         report_text:
 *           type: string
 *           description: Text of the report
 *         report_type_id:
 *           type: string
 *           description: ID of the report type
 *         report_date:
 *           type: string
 *           format: date-time
 *           description: Date of the report
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Category ID (UUID)
 *         title:
 *           type: string
 *           description: Title of the category
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Collection:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Collection ID (UUID)
 *         public_id:
 *           type: integer
 *           description: Public ID for the collection
 *         owner_id:
 *           type: string
 *           description: User ID (UUID) of the collection owner
 *         title:
 *           type: string
 *           description: Title of the collection
 *         category_id:
 *           type: string
 *           description: Category ID (UUID) of the collection
 *         views_count:
 *           type: integer
 *           description: Number of views for the collection
 *         isPublic:
 *           type: boolean
 *           description: Whether the collection is public or not
 *           default: false
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Item ID (UUID)
 *         public_id:
 *           type: integer
 *           description: Public ID for the item
 *         title:
 *           type: string
 *           description: Title of the item
 *         item_description:
 *           type: string
 *           description: Description of the item
 *         owner_id:
 *           type: string
 *           description: User ID (UUID) of the item owner
 *         photo:
 *           type: string
 *           description: URL of the item's photo
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CollectionItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: CollectionItem ID (UUID)
 *         collection_id:
 *           type: string
 *           description: Collection ID (UUID)
 *         item_id:
 *           type: string
 *           description: Item ID (UUID)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CollectionRating:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: CollectionRating ID (UUID)
 *         collection_id:
 *           type: string
 *           description: Collection ID (UUID)
 *         user_id:
 *           type: string
 *           description: User ID (UUID)
 *         rate_text:
 *           type: string
 *           description: Text of the rating
 *         rate:
 *           type: integer
 *           description: Rating score
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ItemRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ItemRequest ID (UUID)
 *         public_id:
 *           type: integer
 *           description: Public ID for the item request
 *         item_title:
 *           type: string
 *           description: Title of the item request
 *         request_description:
 *           type: string
 *           description: Description of the item request
 *         request_photo:
 *           type: string
 *           description: URL of the request photo
 *         category_id:
 *           type: string
 *           description: Category ID (UUID) of the item request
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ItemAdvertisement:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ItemAdvertisement ID (UUID)
 *         public_id:
 *           type: integer
 *           description: Public ID for the item advertisement
 *         item_id:
 *           type: string
 *           description: Item ID (UUID)
 *         user_id:
 *           type: string
 *           description: User ID (UUID)
 *         advertisement_description:
 *           type: string
 *           description: Description of the advertisement
 *         category_id:
 *           type: string
 *           description: Category ID (UUID) of the item advertisement
 */

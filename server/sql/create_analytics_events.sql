-- Create analytics_events table for server-backed metrics
-- MySQL 8+

CREATE TABLE IF NOT EXISTS analytics_events (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  eventType VARCHAR(40) NOT NULL DEFAULT 'page_view',
  path VARCHAR(512) NOT NULL,
  propertyId VARCHAR(64) NULL,
  visitorId VARCHAR(64) NULL,
  referrer VARCHAR(512) NULL,
  userAgent VARCHAR(512) NULL,
  occurredAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_analytics_occurredAt (occurredAt),
  KEY idx_analytics_eventType (eventType),
  KEY idx_analytics_propertyId (propertyId),
  KEY idx_analytics_path (path),
  KEY idx_analytics_visitorId (visitorId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

class Drawing < ApplicationRecord
  belongs_to :user
  has_many :layers, dependent: :destroy
end

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SubscriptionDTO } from "./subscription.dto";
import { Subscription } from "src/entidades/subscription.entity";


@Injectable()
export class SubscriptionService {
    constructor(
        @InjectRepository(Subscription)
        private subscriptionConfigRepository: Repository<Subscription>,
    ) { }

    async get(): Promise<SubscriptionDTO>  {
        const subscription = await this.subscriptionConfigRepository.findOne({ where: { id: 1 } });
        if (!subscription) {
            throw new Error("Subscription with id 1 not found");
        }
        return subscription as SubscriptionDTO;
    }

    async update(id: number, config: Partial<SubscriptionDTO>) {
        await this.subscriptionConfigRepository.update(id, config);
        return this.subscriptionConfigRepository.find({ where: { id: id } });
    }
}